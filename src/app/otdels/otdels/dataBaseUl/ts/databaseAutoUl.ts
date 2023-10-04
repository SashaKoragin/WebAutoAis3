import { Component, OnInit } from '@angular/core';
import { SelectAllParameter } from '../../../../../Api/ModelSelectView/Model/PostRequest';
import { LogicaDataBase, GenerateParametrs } from '../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { DynamicTableColumnModel, Table } from '../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { ModelSelect } from '../../../../../Api/ModelSelectView/Model/ParametrModel';
import { ModelMenuAndModel, ModelDialog, YearModeReport, ModelDataBase } from '../modelDataBase/modelDataBase';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModelDialogTemplateDataBase } from '../templateModelDb/templateTableModelTs/templateTableModel';
import { ModelDialogSelectYear } from './dialogSelectYear/dialogYearTs/dialogSelectYear';

@Component({
  templateUrl: '../html/databaseAutoUl.html',
  styleUrls: ['../css/databaseAutoUl.css'],
  providers: [SelectAllParameter]
})

export class DatabaseAutoUl implements OnInit {
  constructor(public select: SelectAllParameter, public dialog: MatDialog) { }


  modelYear: YearModeReport = new YearModeReport();
  modelDataBase: ModelDialog = new ModelDialog(new ModelDataBase().modelMenu, new ModelDataBase().modelDetal)
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
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.mainselectPreDataBase.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsPreDataBase = this.dinamicmodel.columnsPreDataBase[this.dinamicmodel.mainselectPreDataBase.indexcolumnmodel]
    })
  }

  public async donloadFile(row: any) {
    const dialogRef = this.dialog.open(ModelDialogSelectYear, {
      data: this.modelYear
    })
    dialogRef.afterClosed().subscribe(async (result: YearModeReport) => {
      if (this.modelYear.selectedYears) {
        console.log("Выгружаем ИНН: " + row.Inn + " и год отчета: " + this.modelYear.selectedYears);
        await this.select.noteGenerateUl(row.Inn, this.modelYear.selectedYears).subscribe(async model => {
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
      else {
        alert("Не введен год: " + this.modelYear.selectedYears)
      }
    })
  }

  disableDonloadTemplate(row: any): boolean {
    if (row.StatusFull === "#EC1313") {
      return true
    }
    return false
  }

  selectOpenDialogModel(modelMenu: ModelMenuAndModel, row: any) {
    this.modelDataBase.isUl = true;
    this.modelDataBase.row.Fid = row.Fid;
    this.modelDataBase.row.Name = row.NameSmall;
    this.modelDataBase.row.Inn = row.Inn;
    this.modelDataBase.row.Kpp = row.Kpp;
    this.modelDataBase.row.Ogrn = row.Ogrn;
    this.modelDataBase.row.Address = row.Address;
    this.modelDataBase.row.Status = row.StatusUl;
    this.modelDataBase.row.RegNumber =row.RegNumDecl;
    this.modelDataBase.allDataRow = this.columnsPreDataBase.Model.data
    this.modelDataBase.selectModelMenu = modelMenu;
    this.dialog.open(ModelDialogTemplateDataBase, this.configDialogForm);
  }
}
