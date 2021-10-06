import { OnInit, Component } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';


@Component({
  templateUrl: '../html/viewOkp1Journal121.html',
  styleUrls: ['../css/viewOkp1Journal121.css'],
  providers: [SelectAllParametrs]
})
export class Okp1Journal121 implements OnInit {
  constructor(public select: SelectAllParametrs) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOkp1[this.dinamicmodel.mainselectOkp1.indexcolumnmodel];


  ngOnInit(): void {
    this.delivery(null)
  }

  delivery(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectOkp1.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOkp1[this.dinamicmodel.mainselectOkp1.indexcolumnmodel]
    })
  }


  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.mainselectOkp1.text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

}
