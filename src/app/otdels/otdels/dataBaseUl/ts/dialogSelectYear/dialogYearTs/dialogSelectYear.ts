import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YearModeReport } from '../../../modelDataBase/modelDataBase';


@Component({
  templateUrl: '../dialogYearHtml/dialogSelectYear.html',
  styleUrls: ['../dialogYearCss/dialogSelectYear.css']
})
export class ModelDialogSelectYear {


  constructor(
    public dialogDataBase: MatDialogRef<ModelDialogSelectYear>,
    @Inject(MAT_DIALOG_DATA) public data: YearModeReport) {

  }

  ///Выгрузить отчет
  public sendReport(){
    this.dialogDataBase.close();
  }

}
