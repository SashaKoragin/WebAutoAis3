import { OnInit, Component } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';


@Component({
  templateUrl: '../html/realEstateZmIm.html',
  styleUrls: ['../css/realEstateZmIm.css'],
  providers: [SelectAllParameter]
})
export class RealEstateZmIm implements OnInit {
  constructor(public select: SelectAllParameter) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOkp6[3];

  ngOnInit(): void {
    this.delivery(null)
  }

  delivery(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.selectServerOkp6[3].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOkp6[3]
    })
  }


  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.selectServerOkp6[3].text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

}
