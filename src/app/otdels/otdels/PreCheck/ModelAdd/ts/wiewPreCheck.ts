import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect, TemplateModel, TemplateProcedure } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { FormControl, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Select } from '../../../../../../Api/ModelSelectView/View/SelectView';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { BroadcastEventListener } from 'ng2-signalr';



@Component({
  templateUrl: '../html/wiewPreCheck.html',
  styleUrls: ['../css/wiewPreCheck.css'],
  providers: [SelectAllParameter]
})

export class ModelPreCheck implements OnInit {
  constructor(public select: SelectAllParameter, public SignalR: AuthIdentificationSignalR) { }



  public subscribeMessageSql: any = null;
  public subscribeservers() {
    this.subscribeMessageSql = new BroadcastEventListener<string>('SqlServer');
    this.SignalR.conect.listen(this.subscribeMessageSql);
    this.subscribeMessageSql.subscribe((message: string) => {
      //alert(message);
      this.serverresult.push(message);
      if (message === 'Обработка закончена!') {
        this.selectionChild.update(1);
      }
    });
  }

  public TemplateModel: TemplateModel[] = []
  public selectedTemplate: TemplateModel = undefined;

  @ViewChild(Select) selectionChild: Select;
  public serverresult: string[] = [];
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columnsPre: Table = this.dinamicmodel.columnsPre[this.dinamicmodel.mainselectPre.indexcolumnmodel];



  public validationTemplate(control: AbstractControl): ValidationErrors {
    var nameModel = control.value as TemplateModel;

    return (nameModel == undefined || nameModel.IdTemplate == undefined) ? { 'error': true } : null
  };

  public validationArrayInn(control: AbstractControl): ValidationErrors {
    control.value
    var regx = new RegExp(/^((\d{10,12}\/{1})+(\d{10,12})|(\d{10,12}))$/, 'g')
    if (regx.test(control.value)) {
      return null;
    }
    else {
      return { 'error': true };
    }
  }

  public groupValidationTemplateModel: FormGroup = new FormGroup({
    'Inn': new FormControl(null, [Validators.required, this.validationArrayInn]),
    'Template': new FormControl(new TemplateModel, [Validators.required, this.validationTemplate])
  })



  ngOnInit(): void {
    this.serverInn(null);
    this.allTemplateDataBase();
    this.subscribeservers();
  }



  allTemplateDataBase() {
    this.select.allTemplateDataBase().subscribe((model: TemplateModel[]) => {
      console.log(model);
      this.TemplateModel = model;

    });
  }

  serverInn(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.mainselectPre.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsPre = this.dinamicmodel.columnsPre[this.dinamicmodel.mainselectPre.indexcolumnmodel];
    })
  }

  public isDisableType(): boolean {
    if (this.columnsPre.Type == "ModelTree" && this.columnsPre.Model.data.length > 0) {
      return false;
    }
    return true;
  }



  ///Загрузка ИНН в модель
  public loadinn() {
    var model = new TemplateProcedure();
    model.idTemplateField = this.selectedTemplate.IdTemplate;
    model.innField = this.groupValidationTemplateModel.get('Inn').value.split('/');
    this.serverresult = [];
    this.select.loadInn(model, this.SignalR.iduser).subscribe(() => {
    });
  }

  ///Массовое снятие отобранных веток
  public checkStatusArrayTree(status: string = null) {
    var arrayIdTree = [];
    this.columnsPre.Model.data.forEach(element => {
      arrayIdTree.push(element.IdModel);
    });
    if (arrayIdTree.length > 0) {
      this.select.checkStatus(arrayIdTree, status).subscribe(() => {
        this.selectionChild.update(1);
      })
    }
    else {
      alert('Не выбранно не одного значения для снятия статуса ветки!');
    }
  }

  ///Снятие статуса обработанна ветка
  public checkStatus(row: any, status: string = null) {
    var arrayIdModels = [row.IdModel];
    this.select.checkStatus(arrayIdModels, status).subscribe(() => {
      console.log("Статус снят: " + row.IdModel);
      this.selectionChild.update(1);
    })
  }


  disable(row: any): boolean {
    if (row.StatusModel !== 'Ок!') {
      return true;
    }
    return false;
  }

  check(row: any): boolean {
    if (row.StatusModel) {
      return true;
    }
    return false;
  }
}
