import { OnInit, Component, ViewChild } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect, TemplateProcedure, TemplatePatent } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { FormGroup, FormControl, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { BroadcastEventListener } from 'ng2-signalr';
import { Select } from '../../../../../../Api/ModelSelectView/View/SelectView';

@Component({
  templateUrl: '../html/addPatentOkp3.html',
  styleUrls: ['../css/addPatentOkp3.css'],
  providers: [SelectAllParametrs]
})
export class AddPatent implements OnInit {
  constructor(public select: SelectAllParametrs, public SignalR: AuthIdentificationSignalR) { }


  public serverresult: string[] = [];
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columns: Table = this.dinamicmodel.columnsОкp3[this.dinamicmodel.selectserverОкp3[0].indexcolumnmodel];
  @ViewChild(Select) selectionChild: Select;

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

  public validationArrayInn(control: AbstractControl): ValidationErrors {
    control.value
    var regx = new RegExp(/^((\d{10,10}\/{1})+(\d{10,10})|(\d{10,10}))$/, 'g')
    if (regx.test(control.value)) {
      return null;
    }
    else {
      return { 'error': true };
    }
  }

  public groupValidationTemplateModel: FormGroup = new FormGroup({
    'RegNumPatent': new FormControl(null, [Validators.required, this.validationArrayInn])
  })



  ngOnInit(): void {
    this.serverPatent(null);
    this.subscribeservers();
  }


  serverPatent(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.selectserverОкp3[0].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsОкp3[this.dinamicmodel.selectserverОкp3[0].indexcolumnmodel];
    })
  }

  ///Загрузка ИНН в модель
  public loadPatent() {
    var model = new TemplatePatent();
    model.regNumberPatentField = this.groupValidationTemplateModel.get('RegNumPatent').value.split('/');
    this.serverresult = [];
    this.select.loadRegNumberPatent(model, this.SignalR.iduser).subscribe(() => {
    });
  }

  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.selectserverОкp3[0].text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

}
