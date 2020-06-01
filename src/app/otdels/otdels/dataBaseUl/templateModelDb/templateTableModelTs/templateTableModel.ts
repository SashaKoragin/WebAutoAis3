import { Component, Inject, TemplateRef, ViewChild, ElementRef, OnChanges, OnInit, AfterViewInit, Pipe, PipeTransform, IterableDiffers } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelDialog, ModelMenuAndModel } from '../../modelDataBase/modelDataBase';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { ModelSqlTable } from 'src/Api/ModelSelectTable/View/modelSelectTable';
import { trigger, style, animate, state, transition, keyframes } from '@angular/animations';

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
  providers: [SelectAllParametrs],
  animations: [
    trigger('state', [
      state('inactive', style({ 'display': 'none' })),
      state('active', style({ 'display': 'inline' })),
      transition('active <=> inactive', [
        animate('350ms ease-in', keyframes([
          style({ opacity: '0' }),
        ]))
      ])
    ])
  ]
})

export class ModelDialogTemplateDataBase implements AfterViewInit {
  ///Надо поместить на тег cdkDrag для перемещения
  ///Когда будит стрелки вперед и назад меняем ИНН и модель row на следующую или предыдущую
  ///А рег номер при меню переключения для детализации проверяем есть ли он то подставляем для каждой модели свой рег номер так как в БД это по разному (нужно подумать)
  constructor(
    public dialogDataBase: MatDialogRef<ModelDialogTemplateDataBase>,
    @Inject(MAT_DIALOG_DATA) public data: ModelDialog,
    public select: SelectAllParametrs) {
  }



  public animate: boolean = true;
  @ViewChild('SqlSelect') selectionChild: ModelSqlTable;
  @ViewChild('SqlSelectDetal') selectionChildDetal: ModelSqlTable;

  closeDialog(): void {
    this.dialogDataBase.close();
  }


  eventSelection(select: ModelMenuAndModel) {
    this.selectionChild.postDataSql(select, this.data.row.Inn);
    this.animate = true;
  }

  toolTipBefore(): string {

    let index: number = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    var newIndex = index - 1;
    if (newIndex == -1) {
      return "Предыдущий элемент отсутствует!";
    }
    return `Предыдущая органзация ` +
      `Наименование: ${this.data.allDataRow[newIndex].NameSmall} ` +
      `ИНН:${this.data.allDataRow[newIndex].Inn}`;
  }

  before() {
    let index: number = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    var newIndex = index - 1;
    if (newIndex == -1) {
      return;
    }
    this.animate = true;
    this.data.row = this.data.allDataRow[newIndex];
    this.selectionChild.postDataSql(this.data.selectModelMenu, this.data.row.Inn);
  }

  toolTipNext(): string {
    let index: number = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    var newIndex = index + 1;
    if (newIndex == this.data.allDataRow.length) {
      return "Следующий элемент отсутствует!";
    }
    return `Следующая органзация ` +
      `Наименование: ${this.data.allDataRow[newIndex].NameSmall} ` +
      `ИНН:${this.data.allDataRow[newIndex].Inn}`;
  }

  next() {
    let index: number = this.data.allDataRow.findIndex(item => item.Inn === this.data.row.Inn);
    var newIndex = index + 1;
    if (newIndex == this.data.allDataRow.length) {
      return;
    }
    this.animate = true;
    this.data.row = this.data.allDataRow[newIndex];
    this.selectionChild.postDataSql(this.data.selectModelMenu, this.data.row.Inn);
  }

  selectOpenDetal(modelDetalSelect: ModelMenuAndModel, row: any) {
    if (this.data.selectModelMenu.keyDetal === 1) {
      this.selectionChildDetal.postDataSql(modelDetalSelect, null, row.RegNumDecl);
      this.backSelect()
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
}
