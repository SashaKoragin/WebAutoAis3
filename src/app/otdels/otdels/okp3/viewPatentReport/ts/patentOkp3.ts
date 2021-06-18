import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { ModelDialog, ModelDataBase, ModelMenuAndModel } from '../../../dataBaseUl/modelDataBase/modelDataBase';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModelDialogTemplateDataBase } from '../../../dataBaseUl/templateModelDb/templateTableModelTs/templateTableModel';




@Component({
  templateUrl: '../html/patentOkp3.html',
  styleUrls: ['../css/patentOkp3.css'],
  providers: [SelectAllParametrs]
})

export class Patent implements OnInit {

  constructor(public select: SelectAllParametrs, public dialog: MatDialog) { }

  modelDataBase: ModelDialog = new ModelDialog(new ModelDataBase().modelMenuOkp3, null)
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columns: Table = this.dinamicmodel.columnsОкp3[this.dinamicmodel.selectserverОкp3[1].indexcolumnmodel];

  configDialogForm: MatDialogConfig = {
    position: {
      top: "10px",
      right: "10px",
      bottom: "10px",
      left: "10px"
    },
    maxWidth: '98vw',
    maxHeight: '98vh',
    height: '100%',
    width: '100%',
    panelClass: 'full-screen-modal',
    data: this.modelDataBase
  };


  ngOnInit(): void {
    this.serverPatent(null);
  }

  serverPatent(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.selectserverОкp3[1].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsОкp3[this.dinamicmodel.selectserverОкp3[1].indexcolumnmodel];
    })
  }

  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.selectserverОкp3[1].text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

  selectOpenDialogModel(modelMenu: ModelMenuAndModel, row: any) {
     this.modelDataBase.isUl = false;
     this.modelDataBase.row.Name = row.NameFull;
     this.modelDataBase.row.Inn = row.Inn;
     this.modelDataBase.row.Ogrn = row.OgrnIp;
     this.modelDataBase.row.Address = row.Address;
     this.modelDataBase.row.RegNumber =row.IdPatent;
     this.modelDataBase.row.IndexId = row.IndexId
     this.modelDataBase.allDataRow = this.columns.Model.data
     this.modelDataBase.selectModelMenu = modelMenu;
     this.dialog.open(ModelDialogTemplateDataBase, this.configDialogForm);
  }

}
