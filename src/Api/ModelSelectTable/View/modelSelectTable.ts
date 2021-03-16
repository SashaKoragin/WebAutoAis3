import { Component, TemplateRef, Input, ViewChild, ElementRef } from '@angular/core';
import { Table } from '../../ModelSelectView/Model/DynamicTableModel';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { ModelSelect } from '../../ModelSelectView/Model/ParametrModel';
import { SelectAllParametrs } from '../../ModelSelectView/Model/PostRequest';
import { ModelMenuAndModel } from '../../../app/otdels/otdels/dataBaseUl/modelDataBase/modelDataBase';


@Component({
  selector: 'SqlSelectDataBase',
  templateUrl: '../Html/modelSelectTable.html',
  styleUrls: ['../Css/modelSelectTable.css'],
  providers: [SelectAllParametrs]
})

export class ModelSqlTable {

  constructor(private select: SelectAllParametrs) {
    this.progress = false;
    this.date = false;
    this.errornull = false;
  }

  //Шаблон кнопок в таблице
  @Input() logicstooltable: TemplateRef<any>;
  //Шаблон Панель инструментов
  @Input() toolpanel: TemplateRef<any>;

  //Привязка к таблице
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  //Привязка к Paginator
  @ViewChild('tables', { static: false }) paginator: MatPaginator;
  //Прогресс запроса
  public progress: boolean;
  //Данные отражать или нет
  public date: boolean;
  //Ошибка если нет данных
  public errornull: boolean;

  //Предроверочный анализ База данных
  public columns: Table = { Type: null, Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 };

  public async postDataSql(modelParameter: ModelMenuAndModel, inn: string = null, regNumber: number = 0) {
    try {
      var model = new ModelSelect(modelParameter.idSelect, modelParameter.parameterSelectProcedure, inn, regNumber);
      await this.delay(1);
      this.progress = true;    //Открываем логику загрузки
      this.errornull = false;  //Не показывать ошибки
      this.columns = { Type: null, Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 };
      this.select.detalDataBaseNote(model).subscribe((modelsParameter: ModelSelect) => {
        console.log(modelsParameter.resultSelectProcedureWebField);
        console.log(modelsParameter.parameterProcedureWebField.modelClassFindField);
        var data = (JSON.parse(modelsParameter.resultSelectProcedureWebField)[modelsParameter.parameterProcedureWebField.modelClassFindField]);
        if (data.length !== 0) {
          for (var parameter of modelsParameter.infoViewAutomationField) {
            this.columns.Colums.push({
              columnDef: parameter.nameColumnField, header: parameter.valueField, cell: (element: any, nameColumn: any) => {
                if (element[nameColumn] === 'undefined') {
                  return 'Отсутствует'
                }
                return element[nameColumn]
              }, color: null
            })
          }
          this.columns.Model.data = data;
          this.columns.displayedColumns = this.columns.Colums.map(c => c.columnDef);
          this.columns.allCountRow = this.columns.Model.data.length;
        }
        else {
          this.errornull = true;  //Показать ошибку пустых данных
        }
        this.columns.Model.paginator = this.paginator;
        this.progress = false;    //Закрываем логику загрузки
        this.date = true;
      })

    } catch (e) {
      alert(e.toString());
    }
  }



  public filterDataTable(filterValue: string) {
    this.columns.Model.filter = filterValue.trim().toLowerCase();
  }

  public exportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    var wscols = [];
    for (var key in ws) {
      if (key.indexOf('1') == 1) {
        wscols.push({ wpx: 100 })
      }
    }
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Таблица');
    XLSX.writeFile(wb, 'Отчет.xlsx');
  }

  //Костыль дожидаемся обновление DOM дочернего компанента
  private async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

}
