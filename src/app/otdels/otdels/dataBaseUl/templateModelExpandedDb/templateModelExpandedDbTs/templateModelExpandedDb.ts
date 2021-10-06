import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModelMenuAndModel } from '../../modelDataBase/modelDataBase';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { deserialize } from 'class-transformer';
import { Statement, HeadingStatement } from './modelExpandTable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'TableExpande',
  templateUrl: '../templateModelExpandedDbHtml/templateModelExpandedDb.html',
  styleUrls: ['../templateModelExpandedDbCss/templateModelExpandedDb.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [SelectAllParametrs]
})

export class ExpandeTableStatement {
  constructor(public select: SelectAllParametrs) { }


  public dataSource: MatTableDataSource<HeadingStatement> = new MatTableDataSource<HeadingStatement>();
  public expandedElement: HeadingStatement = null;
  public countMaxPaginator: number = 0;
  public columnsToDisplay = ['NameIndex'];
  public isSelectSqlIsNull: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ///Логика выполнения процедуры
  @Input() modelDetalSelect: ModelMenuAndModel;
  @Input() inn: string;

  async selectStatement(inn: string) {
    var model = new ModelSelect(this.modelDetalSelect.idSelect, this.modelDetalSelect.parameterSelectProcedure, inn);
    this.select.detalDataBaseNote(model).toPromise().then(async (modelsParameter: ModelSelect) => {
      if (modelsParameter) {
        var model = deserialize<Statement>(Statement, modelsParameter.resultSelectProcedureWebField);
        this.dataSource.data = model.HeadingStatement;
        this.isSelectSqlIsNull = true;
        await this.delay(1);
        this.countMaxPaginator = model.HeadingStatement.length;
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.isSelectSqlIsNull = false;
      }
    });
  }

  async exportToWord() {
    var model = new ModelSelect(this.modelDetalSelect.idSelect, this.modelDetalSelect.parameterSelectProcedure, this.inn);
    await this.select.generateStatementUl(model).subscribe(async model => {
      var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = this.inn;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  public expandElement(element: HeadingStatement) {
    if (this.expandedElement) {
      if (this.expandedElement.NameIndex === element.NameIndex) {
        this.expandedElement = null;
        return;
      }
    }
    this.expandedElement = element;
  }

  //Костыль дожидаемся обновление DOM дочернего компанента
  private async delay(ms: number): Promise<void> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

}
