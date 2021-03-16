import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { forbiddenNameValidator } from 'src/Api/ModelSelectView/Model/GenerateParametrFront';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Table, DynamicTableColumnModel } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { Select } from '../../../../../../Api/ModelSelectView/View/SelectView';



@Component({
  templateUrl: '../html/addIdentityFace.html',
  styleUrls: ['../css/addIdentityFace.css'],
  providers: [SelectAllParametrs]
})
export class AddIdentityFace implements OnInit {
  constructor(public select: SelectAllParametrs) { }

  @ViewChild('sql') selectionChild: Select;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOkp5[this.dinamicmodel.mainselectOkp5.indexcolumnmodel];
  ngOnInit(): void {
    this.errorserver(null)

  }

  errorserver(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectOkp5.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOkp5[this.dinamicmodel.mainselectOkp5.indexcolumnmodel]
    })
  }

  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.mainselectOkp5.text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }
  ///Снятие статуса ошибки
  public isCheckIdFile(row: any) {
    var arrayIdDoc = [row.IdDoc];
    this.select.isChekModel(arrayIdDoc).subscribe(() => {
      this.selectionChild.update(1);
    })
  }

  deleteStatusErrorArray() {
    var arrayIdDoc = [];
    this.columns.Model.data.forEach(element => {
      arrayIdDoc.push(element.IdDoc);
    });
    if (arrayIdDoc.length > 0) {
      this.select.isChekModel(arrayIdDoc).subscribe(() => {
        this.selectionChild.update(1);
      })
    }
    else {
      alert('Не выбранно не одного значения для снятия статуса ошибки!');
    }
  }



  public displayedColumns: string[] = ["NameError", "IdDoc"]
  public errorModel: MatTableDataSource<ErrorAddId> = new MatTableDataSource<ErrorAddId>();
  @ViewChild('error', { static: true }) paginatorerror: MatPaginator;
  public messageServers: string = null;
  ///Проверка значений на ввод данных
  public formAdd: FormControl = new FormControl('', [forbiddenNameValidator(/^((\d{1,20}\/{1})+(\d{1,20})|(\d{0,20})|(^$))$/)])

  public addSqlDbId() {
    var arrayId: [] = this.formAdd.value.split('\/')
    this.select.addIdFileTodataBase(arrayId).subscribe((errorServer: ServiceAddFile) => {
      this.errorModel.data = null;
      this.errorModel.data = errorServer.ErrorAddId;
      this.errorModel.paginator = this.paginatorerror;
      this.formAdd.setValue('');
      this.messageServers = `Количество добавленных значений: ${errorServer.CountAddFile}\r\nКоличество ошибочных значений: ${errorServer.CountErrorFile} `
    });
  }
}
//Модель данных обмена с представлением и сервером
export class ServiceAddFile {
  public CountAddFile: number;
  public CountErrorFile: number;
  public ErrorAddId: ErrorAddId[];
}

export class ErrorAddId {
  public NameError: string;
  public IdDoc: number;
}
