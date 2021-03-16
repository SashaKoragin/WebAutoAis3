import { ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface INewLogicaTable<T> {

  //В связи с неоправдано низкой скоростью обработки таблиц выносим шаблоны редактирования отдельно отсюда 3 новых приватных метода
  //Задержка является костылем надо думать как исправить
  //Колонки массив названий
  displayedColumns: any[]

  dataSource: MatTableDataSource<T>
  //Добавление новой записи
  isAdd: boolean;
  //Редактируем
  isEdit: boolean;
  //Модель CallBack в случае ошибке обновления на сервере
  modelCancelError: T;
  //Модель расширения
  model: T;
  //Индекс
  index: number;
  //Модели расширения
  modeltable: T[];
  //ListNode кусочков шаблона подстановки
  temlateList: any
  //ListNode кусочков ячеек в строке для подстановки
  rowList: any    //Строка по номеру из БД Массив
  //Полный шаблон для манипуляции
  fulltemplate: ElementRef
  //Таблица для манипуляции
  table: ElementRef
  //Костыль с задержкой
  delay(ms: number): Promise<void>
  //Добавление шаблона подстановки
  addtemplate(index: number): Promise<void>
  //Удаление шаблона подстановки
  removetemplate(): void

  //Добавление
  add(): Promise<void>;
  //Редактирование
  edit(model: T): void;
  //Сохранение
  save(): void;
  //Удаление
  delete(model: T): void;
  //Отмена
  cancel(model: T): void;
  //Создание новой модели
  newmodel(): T;
  //Фильтрация данных
  filterstable(filterValue: string): void;
  //Возврат из фильтра
  calbackfiltersAll(): void;
  //Метод переноса модификаций моделей
  modifimethod(): void;
  //Метод входа в модель
  addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef, template: ElementRef): Promise<string>

  isEditAndAddTrue(): void;
  isEditAndAddFalse(): void;

}



///Очень важный класс для приемка DTO ответов
export class FullSelectedModel {
  DepartamentOtdel: DepartamentOtdel[]
  SenderTaxJournalOkp2: SenderTaxJournalOkp2[];
}

export class Identification {
  public loginField: string = null;
  public passwordField: string = null;
  public nameField: string = null;
  public groupRuleServerField: string[] = null;
  public isErrorField: boolean = false;
  public errorMessageField: string = null;
}

///Отдел и подпись на отделе Акты Извещения Решения
export class DepartamentOtdel {
  public Id: number;
  public IdSender: number;
  public NameDepartament: string;
  public NameDepartamentActiveDerectory: string;
  public SenderTaxJournalOkp2: SenderTaxJournalOkp2;
  public ModelIsEdit?: boolean = false;
}

///Подписанты
export class SenderTaxJournalOkp2 {
  public Id: number;
  public NameUser: string;
}
