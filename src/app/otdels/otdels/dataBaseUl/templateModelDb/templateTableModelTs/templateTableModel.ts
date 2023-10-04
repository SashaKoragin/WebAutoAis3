import { Component, Inject, ViewChild, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelDialog, ModelMenuAndModel, RowModel } from '../../modelDataBase/modelDataBase';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { ModelSqlTable } from 'src/Api/ModelSelectTable/View/modelSelectTable';
import { trigger, style, animate, state, transition, keyframes } from '@angular/animations';
import { ExpandeTableStatement } from '../../templateModelExpandedDb/templateModelExpandedDbTs/templateModelExpandedDb';

@Pipe({
  name: 'filters'
})
export class FilterParametrs implements PipeTransform {
  public transform(value: any[], keys: number) {
    return value.filter(item => item.keyDetal == keys);
  }
}

@Component({
  selector: 'templateSql',
  templateUrl: '../templateTableModelHtml/templateTableModel.html',
  styleUrls: ['../templateTableModelCss/templateTableModel.css'],
  providers: [SelectAllParameter],
  animations: [
    trigger('state', [
      state('inactive', style({ 'display': 'none' })),
      state('active', style({ 'display': 'inline' })),
      transition('active <=> inactive', [
        animate('350ms ease-in', keyframes([
          style({ opacity: '0' }),
        ]))
      ])
    ]),
    trigger('statement', [
      state('off', style({ 'display': 'none' })),
      state('on', style({ 'display': 'inline' })),
      transition('on <=> off', [
        animate('350ms ease-in', keyframes([
          style({ opacity: '0' }),
        ]))
      ])
    ]),
  ]
})

export class ModelDialogTemplateDataBase implements AfterViewInit {
  ///Надо поместить на тег cdkDrag для перемещения
  ///Когда будит стрелки вперед и назад меняем ИНН и модель row на следующую или предыдущую
  ///А рег номер при меню переключения для детализации проверяем есть ли он то подставляем для каждой модели свой рег номер так как в БД это по разному (нужно подумать)
  constructor(
    public dialogDataBase: MatDialogRef<ModelDialogTemplateDataBase>,
    @Inject(MAT_DIALOG_DATA) public data: ModelDialog,
    public select: SelectAllParameter) {
  }

  public modelConverter: ModelConvert = new ModelConvert();
  public statementAnimate: boolean = true;
  public animate: boolean = true;
  @ViewChild('SqlSelect') selectionChild: ModelSqlTable;
  @ViewChild('SqlSelectDetal') selectionChildDetal: ModelSqlTable;
  @ViewChild('SqlExpandeTable') selectionExpandeTable: ExpandeTableStatement;

  closeDialog(): void {
    this.dialogDataBase.close();
  }

  //Запрос
  async eventSelection(select: ModelMenuAndModel) {
    this.animate = true;
    await this.delay(1);
    if (select.idSelect == 12) {
      this.statementAnimate = false;
      this.selectionExpandeTable.selectStatement(this.data.row.Inn);
    }
    else {
      this.statementAnimate = true;
      this.selectionChild.postDataSql(select, this.data.row.Inn, this.data.row.RegNumber);
    }
  }

  toolTipBefore(): string {
    let index: number
    if (this.data.isUl) {
      index = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    }
    else {
      index = this.data.allDataRow.findIndex(item => item.IndexId === this.data.row.IndexId);
    }
    var newIndex = index - 1;
    if (newIndex == -1) {
      return "Предыдущий элемент отсутствует!";
    }
    return `Предыдущая органзация ` +
      `Наименование: ${(this.data.allDataRow[newIndex].NameSmall === 'undefined') ? this.data.allDataRow[newIndex].NameSmall : this.data.allDataRow[newIndex].NameFull} ` +
      `ИНН:${this.data.allDataRow[newIndex].Inn}`;
  }

  before() {
    let index: number
    if (this.data.isUl) {
      index = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    }
    else {
      index = this.data.allDataRow.findIndex(item => item.IndexId === this.data.row.IndexId);
    }
    var newIndex = index - 1;
    if (newIndex == -1) {
      return;
    }
    this.animate = true;
    this.data.row = this.modelConverter.RowModelConvertUlModel(this.data.row, this.data.allDataRow[newIndex], this.data.isUl);
    if (this.data.selectModelMenu.idSelect == 12) {
      this.selectionExpandeTable.selectStatement(this.data.row.Inn);
    }
    else {
      this.selectionChild.postDataSql(this.data.selectModelMenu, this.data.row.Inn, this.data.row.RegNumber);
    }
  }

  toolTipNext(): string {
    let index: number
    if (this.data.isUl) {
      index = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    }
    else {
      index = this.data.allDataRow.findIndex(item => item.IndexId === this.data.row.IndexId);
    }
    var newIndex = index + 1;
    if (newIndex == this.data.allDataRow.length) {
      return "Следующий элемент отсутствует!";
    }
    return `Следующая органзация ` +
      `Наименование: ${(this.data.allDataRow[newIndex].NameSmall === 'undefined') ? this.data.allDataRow[newIndex].NameSmall : this.data.allDataRow[newIndex].NameFull} ` +
      `ИНН:${this.data.allDataRow[newIndex].Inn}`;
  }

  next() {
    let index: number

    if (this.data.isUl) {
      index = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    }
    else {
      index = this.data.allDataRow.findIndex(item => item.IndexId === this.data.row.IndexId);
    }
    var newIndex = index + 1;
    if (newIndex == this.data.allDataRow.length) {
      return;
    }
    this.animate = true;
    this.data.row = this.modelConverter.RowModelConvertUlModel(this.data.row, this.data.allDataRow[newIndex], this.data.isUl);
    if (this.data.selectModelMenu.idSelect == 12) {
      this.selectionExpandeTable.selectStatement(this.data.row.Inn);
    }
    else {
      this.selectionChild.postDataSql(this.data.selectModelMenu, this.data.row.Inn, this.data.row.RegNumber);
    }
  }

  selectOpenDetal(modelDetalSelect: ModelMenuAndModel, row: any) {
    this.backSelect()
    if (this.data.selectModelMenu.keyDetal === 1) {
      this.selectionChildDetal.postDataSql(modelDetalSelect, null, row.RegNumber);
    }
    if (this.data.selectModelMenu.keyDetal === 2) {
      this.selectionChildDetal.postDataSql(modelDetalSelect, row.Inn, 0);
    }
  }

  backSelect() {
    if (this.animate)
      this.animate = false
    else
      this.animate = true
  }

  async ngAfterViewInit() {

    this.eventSelection(this.data.selectModelMenu);
  }


  //Костыль дожидаемся обновление DOM дочернего компанента
  private async delay(ms: number): Promise<void> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

}

export class ModelConvert {

  public RowModelConvertUlModel(rowModel: RowModel, modelUl: any, isUlAndIp: boolean): RowModel {
    if (isUlAndIp) {
      rowModel.Fid = modelUl.Fid;
      rowModel.Name = modelUl.NameSmall;
      rowModel.Inn = modelUl.Inn;
      rowModel.Kpp = modelUl.Kpp;
      rowModel.Ogrn = modelUl.Ogrn;
      rowModel.Address = modelUl.Address;
      rowModel.Status = modelUl.StatusUl;
      rowModel.RegNumber = modelUl.RegNumDecl;
    }
    else {
      rowModel.Name = modelUl.NameFull;
      rowModel.Inn = modelUl.Inn;
      rowModel.Ogrn = modelUl.OgrnIp;
      rowModel.Address = modelUl.Address;
      rowModel.RegNumber = modelUl.IdPatent;
      rowModel.IndexId = modelUl.IndexId;
    }
    return rowModel;
  }
}
