import { ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VirtualFilter } from '../../app/otdels/otdels/registration/DigitalizationDocument/ts/FilterModelInventoryOgrn';

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
  WebSyteInventory: WebSyteInventory;
  DirectoryDocument: DirectoryDocument[];
  InfoDocument: InfoDocument[];
  DocumentContainer: DocumentContainer[];
  EventProcessError: EventProcessError[];
  AisGrnEventErrorModel: AisGrnEventErrorModel[];
  VirtualFilter: VirtualFilter[];
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
  public StatusFace: string;
  public Office: string;
  public Telephon: string;
  public SenderTaxJournalOkp2: SenderTaxJournalOkp2;
  public ModelIsEdit?: boolean = false;
}

///Подписанты
export class SenderTaxJournalOkp2 {
  public Id: number;
  public NameUser: string;
}


//Сотрудники организации

export class UserOrg {
  public IdUser: number;
  public InnUser: string;
  public IdProcedure: number;
  public Family: string;
  public Name: string;
  public Surname: string;
  public DateOfBirth: any;
  public VidDoc: string;
  public Seria: string;
  public Number: string;
  public DateIn: any;
  public Code: string;
  public WhoIn: string;
  public Location: string;
  public IsError: boolean;
  public IsGood: boolean;
  public MessageInfo: string;
}

export class QuestionsAndUsers {
  public IdQuestions: number;
  public IdUser: number;
  public ModelQuestions: string;
}

export class WebSyteInventory {
  OrganizationOgrnInventory: OrganizationOgrnInventory[];
}

export class OrganizationOgrnInventory {
  public IdOgrn: number;
  public UserLogin: string;
  public NumberOgrn: number;
  public IsHiddenWeb: boolean;
  public IdStatus: number;
  public GrnInventories: GrnInventories[];
  public ModelIsEdit: boolean = false;
}

export class GrnInventories {
  public IdDocGrn: number;
  public IdGrnAis3: number;
  public IdOgrn: number;
  public NumberOgrnGrn: number;
  public NameDocument: string;
  public IsStartProcess: boolean;
  public IsFindGrnDataBase: boolean;
  public StatusFinish: boolean;
  public DocumentInventories: DocumentInventories[]
  public ModelIsEdit: boolean = false;
}

export class DocumentInventories {
  public IdDocument: number;
  public IdDocGrn: number;
  public IdDocumentDirectory: number;
  public IdInfo?: number;
  public CountPage: number;
  public GuidDocument: string;
  public StateDocument: boolean;
  public IdStatusDocument: number;
  public DirectoryDocument: DirectoryDocument;
  public InfoDocument: InfoDocument = null;
  public GrnInventories: GrnInventories = null;
  public StatusDocument: StatusDocument = null;
  public ModelIsEdit: boolean = false;
}


export class DirectoryDocument {
  public IdDocumentDirectory: number;
  public NameDocumentDataBase: string
}

export class InfoDocument {
  public IdInfo: number;
  public NameDocumentInfo: string;
  public ModelIsEdit: boolean = false;
}

export class StatusDocument {
  public IdStatusDocument: number;
  public NameMessage: string;
}
///Контейнеры ФКУ
export class DocumentContainer {
  public IdContainer: number;
  public BarcodeContainer: string;
  public CountCurrent: number;
  public CountDocumentMin: number;
  public CountDocumentMax: number;
  public IsFinishContainer: boolean;
  public ModelIsEdit: boolean = false;
}

export class EventProcessError {
  public IdProcess: number;
  public FullKeyProcess: string;
  public IdStatusEvent: number;
  public StatusEvent: StatusEvent;
}

export class StatusEvent {
  public IdStatusEvent: number;
  public NameStatusEvent: string;
}

export class AisGrnEventErrorModel {
  public NumberOgrnGrn: number;
  public AisGrnDocument: AisGrnDocument;
}

export class AisGrnDocument {
  public IdGrnAis3: number;
  public FullNameGrnAis3: string;
}



