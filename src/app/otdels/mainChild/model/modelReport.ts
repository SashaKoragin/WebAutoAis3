import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


export class ModelReport {
  public otdel: string;
  public isrule: string[]
  public children: ModelReport[];
  public types: string;
  public pages: string;
  public model: string;
}

@Injectable()
export class Report {

  dataChange = new BehaviorSubject<ModelReport[]>([{
    otdel: 'Отчеты по автоматам',
    children: [
      {
        otdel: 'Отдел выездных проверок №2',
        children: [{
          otdel: null,
          children: null, types: 'Книги покупок/продаж', pages: './Sales', model: 'Книги покупок/продаж', isrule: ['i7751-Informatizatsii', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-KP#5', 'i7751-KA', 'i7751-PA']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №2',
        children: [{
          otdel: null,
          children: null, types: 'Отчеты налоговых правонарушений', pages: './nalog129', model: 'Отчеты налоговых правонарушений', isrule: ['i7751-Informatizatsii', 'i7751-KP#2', 'i7751-KP#5', 'i7751-L-ServersAdmins']
        },
        {
          otdel: null,
          children: null, types: 'Подпись руководителя', pages: './SignatureOkp2', model: 'Подпись руководителя', isrule: ['i7751-Informatizatsii', 'i7751-KP#2', 'i7751-L-ServersAdmins']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №3',
        children: [{
          otdel:null,
          children:null, types: 'Патенты', pages: './patent', model: 'Патенты', isrule: ['i7751-Informatizatsii', 'i7751-KP#3', 'i7751-L-ServersAdmins', 'i7751-PA']
        },
        {
          otdel: null,
          children: null, types: 'Добавление Рег-Номеров патентов', pages: './addPatent', model: 'Патенты', isrule: ['i7751-Informatizatsii', 'i7751-KP#3', 'i7751-L-ServersAdmins', 'i7751-PA']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №5',
        children: [{
          otdel: null,
          children: null, types: 'Журналы 2НДФЛ', pages: './2ndfl', model: 'Журналы 2НДФЛ', isrule: ['i7751-Informatizatsii', 'i7751-KP#5', 'i7751-L-ServersAdmins']
        },
        {
          otdel: null,
          children: null, types: 'Добавление файлов', pages: './AddFile', model: 'Добавление файлов', isrule: ['i7751-Informatizatsii', 'i7751-KP#5', 'i7751-L-ServersAdmins']
        }
        ], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №6',
        children: [{
          otdel: null,
          children: null, types: 'Отправленные документы', pages: './DeliveryDocument', model: 'Отправленные документы', isrule: ['i7751-Informatizatsii', 'i7751-KP#6', 'i7751-L-ServersAdmins']
        }
        ], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел предпроверочного анализа',
        children: [{
          otdel: null,
          children: null, types: 'Журнал налоговых нарушений', pages: './JournalPreCheck129', model: 'Журнал налоговых нарушений', isrule: ['i7751-Informatizatsii', 'i7751-L-ServersAdmins', 'i7751-PA']
        },
        {
          otdel: null,
          children: null, types: 'Создание карточек ЮЛ (Просмотр)', pages: './modelUl', model: 'Создание карточек ЮЛ (Просмотр)', isrule: ['i7751-Informatizatsii', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-KA', 'i7751-KP#4']
        },
        {
          otdel: null,
          children: null, types: 'Книги покупок-продаж операции банка', pages: './salesBookBank', model: 'Книги покупок-продаж операции банка', isrule: ['i7751-Informatizatsii', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-KA', 'i7751-KP#4']
        },
        {
          otdel: null,
          children: null, types: 'Модель добавления ИНН ЮЛ', pages: './preCheck', model: 'Модель добавления ИНН ЮЛ', isrule: ['i7751-Informatizatsii', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-KA', 'i7751-KP#4', 'i7751-KP#5', 'i7751-KP#2']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел расчетов с бюджетом',
        children: [{
          otdel: null,
          children: null, types: 'Аналитика уточнения платежей', pages: './payment', model: 'Модель обработки платежей', isrule: ['i7751-Informatizatsii', 'i7751-L-ServersAdmins', 'i7751-RsB']
        }], types: null, pages: null, model: null, isrule: null
      }
    ], types: null, pages: null, model: null, isrule: null
  }]);
}
