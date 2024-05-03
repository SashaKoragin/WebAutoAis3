import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAllParameter } from "src/Api/ModelSelectView/Model/PostRequest";
import { Select } from '../../../../../../Api/ModelSelectView/View/SelectView';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { ModelSelect, TemplateInnPattern } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { BroadcastEventListener } from 'ng2-signalr';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  templateUrl: '../html/addInnFaceRegistryReference.html',
  styleUrls: ['../css/addInnFaceRegistryReference.css'],
  providers: [SelectAllParameter]
})
export class ModelRegistryReference implements OnInit {
  constructor(public select: SelectAllParameter, public SignalR: AuthIdentificationSignalR) { }

  public serverresult: string[] = [];
  @ViewChild(Select) selectionChild: Select;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOrn[this.dinamicmodel.selectOrn[0].indexcolumnmodel];

  public subscribeMessageSql: any = null;

  ngOnInit(): void {
    this.modelFace(null);
    this.subscribeservers();
  }

  modelFace(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.selectOrn[0].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOrn[this.dinamicmodel.selectOrn[0].indexcolumnmodel]
    })
  }

  public subscribeservers() {
    this.subscribeMessageSql = new BroadcastEventListener<string>('SqlServer');
    this.SignalR.connect.listen(this.subscribeMessageSql);
    this.subscribeMessageSql.subscribe((message: string) => {
      this.serverresult.push(message);
      if (message === 'Обработка закончена!') {
        this.selectionChild.update(1);
      }
    });
  }

  ///Загрузка ИНН в модель
  public loadInn() {
    var model = new TemplateInnPattern();
    model.innField = this.groupValidationTemplateModel.get('Inn').value.split('/');
    this.serverresult = [];
    this.select.loadInnOrn(model, this.SignalR.iduser).subscribe(() => {
    });
  }


  deleteRegistryReference

  public validationArrayInn(control: AbstractControl): ValidationErrors {
    control.value
    var regx = new RegExp(/^(((\d{10}|\d{12})\/{1})+(\d{10}|\d{12})|(\d{10}|\d{12}))$/, 'g')
    if (regx.test(control.value)) {
      return null;
    }
    else {
      return { 'error': true };
    }
  }

  public groupValidationTemplateModel: FormGroup = new FormGroup({
    'Inn': new FormControl(null, [Validators.required, this.validationArrayInn])
  })


  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.selectOrn[0].text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

  delete(row: any,) {
    this.select.deleteInn(row.InnFace).subscribe((message: string) => {
      console.log(message);
      this.selectionChild.update(1);
    });
  }

}
