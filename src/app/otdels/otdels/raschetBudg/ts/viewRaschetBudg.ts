import { Component, OnInit } from '@angular/core';
import { DynamicTableColumnModel, Table } from '../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../Api/ModelSelectView/Model/ParametrModel';
import { SelectAllParameter } from '../../../../../Api/ModelSelectView/Model/PostRequest';

@Component({
  templateUrl: '../html/viewRaschetBudg.html',
  styleUrls: ['../css/viewRaschetBudg.css'],
  providers: [SelectAllParameter]
})
export class ModelRaschetBudgPayment implements OnInit {

  constructor(public select: SelectAllParameter) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columnsPre: Table = this.dinamicmodel.columnsRaschetBudg[this.dinamicmodel.mainselectRaschetBudg.indexcolumnmodel];


  ngOnInit(): void {
    this.serverInn(null)
  }

  serverInn(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.mainselectRaschetBudg.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsPre = this.dinamicmodel.columnsRaschetBudg[this.dinamicmodel.mainselectRaschetBudg.indexcolumnmodel];
    })
  }

}
