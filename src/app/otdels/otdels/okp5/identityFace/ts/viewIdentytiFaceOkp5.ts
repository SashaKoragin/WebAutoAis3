import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { Component } from '@angular/core';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { OnInit } from '@angular/core';


@Component({
  templateUrl: '../html/viewIdentytiFaceOkp5.html',
  styleUrls: ['../css/viewIdentytiFaceOkp5.css'],
  providers: [SelectAllParametrs]
})
export class IdentytiFaceOkp5 implements OnInit  {
  constructor(public select: SelectAllParametrs) { }




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
    this.select.generateXlsxServer(reportSql,reportSql.selectInfoField);
  }



}
