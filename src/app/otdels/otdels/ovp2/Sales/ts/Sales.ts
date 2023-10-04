import { OnInit, Component } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { ModelDataBase, ModelDialog, ModelMenuAndModel } from '../../../dataBaseUl/modelDataBase/modelDataBase';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModelDialogTemplateDataBase } from '../../../dataBaseUl/templateModelDb/templateTableModelTs/templateTableModel';



@Component({
  templateUrl: '../html/Sales.html',
  styleUrls: ['../css/Sales.css'],
  providers: [SelectAllParameter]
})

export class Sales implements OnInit {

  constructor(public select: SelectAllParameter, public dialog: MatDialog){ }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  modelDataBase: ModelDialog = new ModelDialog(new ModelDataBase().modelMenuOvp2, new ModelDataBase().modelDetal)
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;
  columnsOvp2: Table = this.dinamicmodel.columnsOvp2[this.dinamicmodel.mainselectOvp2.indexcolumnmodel];

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
    this.serverUl(null);
  }

  serverUl(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.mainselectOvp2.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      console.log(this.selecting);
      this.columnsOvp2 = this.dinamicmodel.columnsOvp2[this.dinamicmodel.mainselectOvp2.indexcolumnmodel]
    })
  }

  public async donloadFile(row: any) {
    await this.select.generateSummarySales(row.Inn);
  }

  disableDonloadTemplate(row: any): boolean {
    if (row.StatusFull === "#EC1313") {
      return true
    }
    return false
  }

  selectOpenDialogModel(modelMenu: ModelMenuAndModel, row: any) {
    this.modelDataBase.row = row;
    this.modelDataBase.allDataRow = this.columnsOvp2.Model.data
    this.modelDataBase.selectModelMenu = modelMenu;
    this.dialog.open(ModelDialogTemplateDataBase, this.configDialogForm);
  }
}
