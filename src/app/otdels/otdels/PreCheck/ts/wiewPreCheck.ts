import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SelectAllParametrs } from '../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../Api/ModelSelectView/Model/ParametrModel';
import { FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Select } from '../../../../../Api/ModelSelectView/View/SelectView';




@Component({
  templateUrl: '../html/wiewPreCheck.html',
  styleUrls: ['../css/wiewPreCheck.css'],
  providers: [SelectAllParametrs]
})

export class ModelPreCheck implements OnInit {
  constructor(public select: SelectAllParametrs) { }


  @ViewChild(Select) selectionChild: Select;
  public serverresult: string = null;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columnsPre: Table = this.dinamicmodel.columnsPre[this.dinamicmodel.mainselectPre.indexcolumnmodel];

  public inputInn: FormControl = new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.validationNumber]);

  ngOnInit(): void {
    this.serverInn(null)
  }

  public validationNumber(control: AbstractControl): ValidationErrors {
    control.value
    var regx = new RegExp(/^\d+$/, 'g')
    if (regx.test(control.value)) {
      return null;
    }
    else {
      return { 'error': true };
    }
  }

  serverInn(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectPre.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsPre = this.dinamicmodel.columnsPre[this.dinamicmodel.mainselectPre.indexcolumnmodel]
    })
  }

  ///Загрузка ИНН в модель
  public loadinn(inn: string) {
    this.serverresult = null;
    this.select.loadInn(inn).subscribe((message: string) => {
      this.serverresult = message;
      this.selectionChild.update(1);
    })
  }

  checkStatus(row: any) {
    this.select.checkStatus(row.IdModel).subscribe(() => {
      console.log("Статус снят: " + row.IdModel);
      this.selectionChild.update(1);
    })
  }

  disableCheck(row: any): boolean {
    if (row.StatusModel) {
      return false;
    }
    return true;
  }
}
