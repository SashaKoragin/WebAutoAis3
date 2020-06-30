import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';



@Component({
  templateUrl: '../html/Journal129.html',
  styleUrls: ['../css/Journal129.css'],
  providers: [SelectAllParametrs]
})

export class JournalPreCheck implements OnInit {

  constructor(public select: SelectAllParametrs) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columnsAll129: Table = this.dinamicmodel.columnsAll129[this.dinamicmodel.mainselectAll129.indexcolumnmodel];


  ngOnInit(): void {
    this.serverUl(null);
  }


  serverUl(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectAll129.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsAll129 = this.dinamicmodel.columnsAll129[this.dinamicmodel.mainselectAll129.indexcolumnmodel];
    })
  }
}
