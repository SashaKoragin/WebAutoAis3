import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { ModelDialogSelectYear } from '../../ts/dialogSelectYear/dialogYearTs/dialogSelectYear';
import { YearModeReport } from '../../modelDataBase/modelDataBase';





@Component({
  templateUrl: '../html/salesBookBank.html',
  styleUrls: ['../css/salesBookBank.css'],
  providers: [SelectAllParametrs]
})

export class SalesBookBankUlFace implements OnInit {
  constructor(public select: SelectAllParametrs, public dialog: MatDialog) { }

  modelYear: YearModeReport = new YearModeReport();
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columnsPreDataBase: Table = this.dinamicmodel.columnsPreDataBase[this.dinamicmodel.mainselectPreDataBaseBookSales.indexcolumnmodel];


  ngOnInit(): void {
    this.serverUl(null);
  }

  serverUl(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectPreDataBaseBookSales.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columnsPreDataBase = this.dinamicmodel.columnsPreDataBase[this.dinamicmodel.mainselectPreDataBaseBookSales.indexcolumnmodel]
    })
  }

  public async donloadFile(row: any) {
    const dialogRef = this.dialog.open(ModelDialogSelectYear, {
      data: this.modelYear
    })
    dialogRef.afterClosed().subscribe(async (result: YearModeReport) => {
      if (this.modelYear.selectedYears) {
        console.log("Выгружаем ИНН: " + row.Inn + " и год отчета: " + this.modelYear.selectedYears);
        await this.select.generateBookSalesUl(row.Inn, this.modelYear.selectedYears).subscribe(async model => {
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

  public async downloadXlsxReportAskNds(row:any){
    const dialogRef = this.dialog.open(ModelDialogSelectYear, {
      data: this.modelYear
    })
    dialogRef.afterClosed().subscribe(async (result: YearModeReport) => {
      if (this.modelYear.selectedYears) {
        console.log("Выгружаем ИНН: " + row.Inn + " и год отчета: " + this.modelYear.selectedYears);
        await this.select.generateAskNds(row.Inn, this.modelYear.selectedYears).subscribe(async model => {
          var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = `Отчет АСК НДС ${row.Inn}`;
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
}
