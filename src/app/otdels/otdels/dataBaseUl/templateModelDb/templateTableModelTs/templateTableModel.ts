import { Component, Inject, TemplateRef, ViewChild, ElementRef, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelDataBase, ModelDialog, ModelMenuAndModel } from '../../modelDataBase/modelDataBase';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { MatTableDataSource } from '@angular/material/table';
import { LogicaDataBase } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { element } from 'protractor';
import { ModelSqlTable } from 'src/Api/ModelSelectTable/View/modelSelectTable';



@Component({
  selector: 'templateSql',
  templateUrl: '../templateTableModelHtml/templateTableModel.html',
  styleUrls: ['../templateTableModelCss/templateTableModel.css'],
  providers: [SelectAllParametrs]
})

export class ModelDialogTemplateDataBase implements AfterViewInit {

  ///Когда будит стрелки вперед и назад меняем ИНН и модель row на следующую или предыдущую
  ///А рег номер при меню переключения для детализации проверяем есть ли он то подставляем для каждой модели свой рег номер так как в БД это по разному (нужно подумать)
  constructor(
    public dialogDataBase: MatDialogRef<ModelDialogTemplateDataBase>,
    @Inject(MAT_DIALOG_DATA) public data: ModelDialog,
    public select: SelectAllParametrs) {

  }

  @ViewChild(ModelSqlTable) selectionChild: ModelSqlTable;
  closeDialog(): void {
    this.dialogDataBase.close();
  }


  eventSelection(select: ModelMenuAndModel) {
    this.selectionChild.postDataSql(select, this.data.row.Inn);
  }

  async ngAfterViewInit() {
    this.eventSelection(this.data.selectModelMenu);
  }

}
