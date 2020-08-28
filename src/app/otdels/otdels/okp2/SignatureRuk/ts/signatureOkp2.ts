import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from 'src/Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase } from 'src/Api/ModelSelectView/Model/GenerateParametrFront';
import { GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { Select } from '../../../../../../Api/ModelSelectView/View/SelectView';

@Component({
  templateUrl: '../html/signatureOkp2.html',
  styleUrls: ['../css/signatureOkp2.css'],
  providers: [SelectAllParametrs]
})

export class SignatureOkp2 implements OnInit {
  constructor(public select: SelectAllParametrs) { }

  @ViewChild(Select) selectionChild: Select;
  public dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  public logica: LogicaDataBase = new LogicaDataBase();
  public selecting: GenerateParametrs;
  public columns: Table = this.dinamicmodel.columnsSignature[this.dinamicmodel.mainselectSignature.indexcolumnmodel];

  ngOnInit(): void {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectSignature.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsSignature[this.dinamicmodel.mainselectSignature.indexcolumnmodel]
    })
  }

  public check(row: any): boolean {
    if (row.IsActual) {
      return true;
    }
    return false;
  }

  public checkStatus(row: any) {
    this.select.actualizationSignature(row.Id).subscribe((isCheck: boolean) => {
      if (isCheck) {
        this.selectionChild.update(1);
      }
    })
  }
}
