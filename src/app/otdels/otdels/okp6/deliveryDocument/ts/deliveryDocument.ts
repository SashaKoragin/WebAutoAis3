import { OnInit, Component } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';


@Component({
  templateUrl: '../html/deliveryDocument.html',
  styleUrls: ['../css/deliveryDocument.css'],
  providers: [SelectAllParameter]
})
export class DeliveryDocument implements OnInit {
  constructor(public select: SelectAllParameter) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOkp6[this.dinamicmodel.mainselectOkp6.indexcolumnmodel];


  ngOnInit(): void {
    this.delivery(null)
  }

  delivery(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.mainselectOkp6.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOkp6[this.dinamicmodel.mainselectOkp6.indexcolumnmodel]
    })
  }
}
