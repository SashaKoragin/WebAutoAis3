import { OnInit, Component, ViewChild } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect, TemplateInnPattern } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { Select } from '../../../../../../Api/ModelSelectView/View/SelectView';
import { AbstractControl, ValidationErrors, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { BroadcastEventListener } from 'ng2-signalr';


@Component({
  templateUrl: '../html/viewRegistrationFace.html',
  styleUrls: ['../css/viewRegistrationFace.css'],
  providers: [SelectAllParameter]
})
export class ModelRegistrationFace implements OnInit {
  constructor(public select: SelectAllParameter, public SignalR: AuthIdentificationSignalR) { }


  public serverresult: string[] = [];
  @ViewChild(Select) selectionChild: Select;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsRegistration[this.dinamicmodel.selectserverRegistration[0].indexcolumnmodel];

  public subscribeMessageSql: any = null;



  ngOnInit(): void {
    this.modelFace(null);
    this.subscribeservers();
  }


  modelFace(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.selectserverRegistration[0].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsRegistration[this.dinamicmodel.selectserverRegistration[0].indexcolumnmodel]
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
    this.select.loadInnRegistration(model, this.SignalR.iduser).subscribe(() => {
    });
  }


  ///Статус Принудительное завершение обработки
  checkStatus(row: any, isExecute: boolean) {
    this.select.checkStatusFl(row.Inn, isExecute).subscribe(() => {
      console.log("Принудительное завершение обработки: " + row.Inn);
      this.selectionChild.update(1);
    })
  }

  public validationArrayInn(control: AbstractControl): ValidationErrors {
    control.value
    var regx = new RegExp(/^((\d{12,12}\/{1})+(\d{12,12})|(\d{12,12}))$/, 'g')
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
    reportSql.selectInfoField = this.dinamicmodel.selectserverRegistration[0].text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

}
