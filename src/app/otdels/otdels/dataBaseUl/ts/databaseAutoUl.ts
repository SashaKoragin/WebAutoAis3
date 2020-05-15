import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../../../Api/ModelSelectView/Model/PostRequest';
import { LogicaDataBase, GenerateParametrs } from '../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { DynamicTableColumnModel, Table } from '../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { ModelSelect } from '../../../../../Api/ModelSelectView/Model/ParametrModel';
import { ModelMenuAndModel, ModelDialog } from '../modelDataBase/modelDataBase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModelDialogTemplateDataBase } from '../templateModelDb/templateTableModelTs/templateTableModel';





@Component({
  templateUrl: '../html/databaseAutoUl.html',
  styleUrls: ['../css/databaseAutoUl.css'],
  providers: [SelectAllParametrs]
})

export class DatabaseAutoUl implements OnInit {
  constructor(public select: SelectAllParametrs, public dialog: MatDialog) { }


  modelDataBase: ModelDialog = new ModelDialog()
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

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


  columnsPreDataBase: Table = this.dinamicmodel.columnsPreDataBase[this.dinamicmodel.mainselectPreDataBase.indexcolumnmodel];
  ngOnInit(): void {
    this.serverUl(null);
  }

  serverUl(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectPreDataBase.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsPreDataBase = this.dinamicmodel.columnsPreDataBase[this.dinamicmodel.mainselectPreDataBase.indexcolumnmodel]
    })
  }

  public async donloadFile(row: any) {
    console.log(row.Inn);
    await this.select.noteGenerateUl(row.Inn).subscribe(async model => {
      var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = row.Inn;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  disableDonloadTemplate(row: any): boolean {
    if (row.StatusFull === "#EC1313") {
      return true
    }
    return false
  }

  selectOpenDialogModel(modelMenu: ModelMenuAndModel, row: any) {
    this.modelDataBase.row = row;
    console.log(row);
    this.modelDataBase.selectModelMenu = modelMenu;
    console.log(this.modelDataBase.selectModelMenu.categoria);
    var dialogRef = this.dialog.open(ModelDialogTemplateDataBase, this.configDialogForm);
  }



}
