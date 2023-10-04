import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { BroadcastEventListener } from 'ng2-signalr';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ModelSqlTable } from 'src/Api/ModelSelectTable/View/modelSelectTable';
import { MatTableDataSource } from '@angular/material/table';
import { UserOrg, QuestionsAndUsers } from '../../../../../../Api/RequestService/modelAutomation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: '../html/interrogationOfWitnesses.html',
  styleUrls: ['../css/interrogationOfWitnesses.css'],
  providers: [SelectAllParameter]
})
export class InterrogationOfWitnesses implements OnInit {
  constructor(public select: SelectAllParameter, public SignalR: AuthIdentificationSignalR) { }

  isLoad: boolean = true;
  isLoadQuestions: boolean = true;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsKao[0];

  selectionRowModel = new SelectionModel<any>(false, []);

  selectionRowQuestions = new SelectionModel<any>(false, []);

  @ViewChild('TABLEUSERSORG', { static: false }) tableUsers: ElementRef;
  @ViewChild('usersOrg', { static: true }) paginatorUsersOrg: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortUsersOrg: MatSort;

  public displayedColumns = ['Logic', 'IdUser', 'InnUser', 'IdProcedure', 'Family', 'Name', 'Surname', 'DateOfBirth', 'VidDoc', 'Seria', 'Number', 'DateIn', 'Code', 'IsError', 'IsGood', 'MessageInfo'];
  public dataSource: MatTableDataSource<UserOrg> = new MatTableDataSource<UserOrg>();

  @ViewChild('TABLEQUESTIONS', { static: false }) tableQuestions: ElementRef;
  @ViewChild('usersQuestions', { static: true }) paginatorQuestions: MatPaginator;

  public displayedColumnsQuestions = ['IdQuestions', 'IdUser', 'ModelQuestions'];
  public dataSourceQuestions: MatTableDataSource<QuestionsAndUsers> = new MatTableDataSource<QuestionsAndUsers>();



  public serverResult: string[] = [];

  public subscribeMessageSql: any = null;
  public subscribeServers() {
    this.subscribeMessageSql = new BroadcastEventListener<string>('SqlServer');
    this.SignalR.conect.listen(this.subscribeMessageSql);
    this.subscribeMessageSql.subscribe((message: string) => {
      this.serverResult.push(message);
      if (message === 'Обработка закончена!') {

      }
    });
  }

  ngOnInit(): void {
    this.subscribeServers();
    this.selectMainOrgAndQuestions(null)
  }

  selectMainOrgAndQuestions(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(39)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsKao[0]
    })
  }

  async isCheckIdFile() {
    if (this.selectionRowModel.selected.length === 1) {
      console.log(this.selectionRowModel.selected);
      await this.select.allUsers(this.selectionRowModel.selected[0].Inn);
      this.dataSource.paginator = this.paginatorUsersOrg;
      this.dataSource.sort = this.sortUsersOrg
      this.dataSource.data = this.select.select.UserOrg;
      this.isLoad = false;

    }
    else {
      this.isLoad = true;
      this.isLoadQuestions = true;
      this.dataSource.data = [];
      this.dataSourceQuestions.data = [];
    }
  }

  async isCheckQuestions() {
    if (this.selectionRowQuestions.selected.length === 1) {
      await this.select.allQuestions(this.selectionRowQuestions.selected[0].IdUser.toString())
      this.dataSourceQuestions.paginator = this.paginatorQuestions;
      this.dataSourceQuestions.data = this.select.select.QuestionsAndUsers;
      this.isLoadQuestions = false;
    }
    else {
      this.isLoadQuestions = true;
      this.dataSourceQuestions.data = [];
    }
  }

}
