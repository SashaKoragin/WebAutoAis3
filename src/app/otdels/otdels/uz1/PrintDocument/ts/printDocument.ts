import { OnInit, Component } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';

@Component({
  templateUrl: '../html/printDocument.html',
  styleUrls: ['../css/printDocument.css'],
  providers: [SelectAllParameter]
})

export class PrintDocument implements OnInit {
  constructor(public select: SelectAllParameter) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOuz1[0];





  ngOnInit(): void {
    this.selectDocumentPrinter(null);
  }

  selectDocumentPrinter(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(40)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOuz1[0];
    })
  }

  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = "Реестр документов";
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }
}
