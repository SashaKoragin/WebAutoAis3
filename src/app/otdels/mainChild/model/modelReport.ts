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
          children: null, types: 'Книги покупок/продаж', pages: './Sales', model: 'Книги покупок/продаж', isrule: ['i7751-IT', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-KP#5', 'i7751-KP#7', 'i7751-KA', 'i7751-PA', 'i7751-Rukovodstvo']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел работы с налогоплательщиками',
        children: [{
          otdel: null,
          children: null, types: 'Формирование справки о наличии сальдо по инициативе НО', pages: './registryReference', model: 'Формирование справки о наличии сальдо по инициативе НО', isrule: ['i7751-IT', 'i7751-RsN', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        },
        ], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел урегулирования задолженности №1',
        children: [{
          otdel: null,
          children: null, types: 'Печать документов (Реестры)', pages: './printDoc', model: 'Печать документов (Реестры)', isrule: ['i7751-IT', 'i7751-UZ#1', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        },
        ], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №1',
        children: [{
          otdel: null,
          children: null, types: 'Журнал нарушений', pages: './nalog121', model: 'Отчеты нарушений', isrule: ['i7751-IT', 'i7751-KP#1', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo', 'i7751-ID', 'i7751-KP#5', 'i7751-KP#2']
        },
        {
          otdel: null,
          children: null, types: 'ЕАЭС-обмен документы', pages: './easDocument', model: 'Документы ЕАЭС', isrule: ['i7751-IT', 'i7751-KP#1', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        }
        ], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №2',
        children: [{
          otdel: null,
          children: null, types: 'Отчеты налоговых правонарушений', pages: './nalog129', model: 'Отчеты налоговых правонарушений', isrule: ['i7751-IT', 'i7751-KP#1', 'i7751-KP#2', 'i7751-KP#5', 'i7751-KP#7', 'i7751-KP#3', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo', 'i7751-ID']
        },
        {
          otdel: null,
          children: null, types: 'Подпись руководителя', pages: './SignatureOkp2', model: 'Подпись руководителя', isrule: ['i7751-IT', 'i7751-KP#1', 'i7751-KP#2', 'i7751-KP#5', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №3',
        children: [{
          otdel: null,
          children: null, types: 'Патенты', pages: './patent', model: 'Патенты', isrule: ['i7751-IT', 'i7751-KP#3', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Добавление Рег-Номеров патентов', pages: './addPatent', model: 'Патенты', isrule: ['i7751-IT', 'i7751-KP#3', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-Rukovodstvo']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №5',
        children: [{
          otdel: null,
          children: null, types: 'Журналы 2НДФЛ', pages: './2ndfl', model: 'Журналы 2НДФЛ', isrule: ['i7751-IT', 'i7751-KP#5', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Добавление файлов', pages: './AddFile', model: 'Добавление файлов', isrule: ['i7751-IT', 'i7751-KP#5', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        }
        ], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел камеральных проверок №6',
        children: [{
          otdel: null,
          children: null, types: 'Отправленные документы', pages: './DeliveryDocument', model: 'Отправленные документы', isrule: ['i7751-IT', 'i7751-KP#6', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Журнал проверки 3НДФЛ', pages: './TaxDeclarationFl', model: 'Журнал проверки 3НДФЛ', isrule: ['i7751-IT', 'i7751-KP#6', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Журнал требований 3НДФЛ', pages: './Journal3Ndfl', model: 'Журнал требований 3НДФЛ', isrule: ['i7751-IT', 'i7751-KP#6', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Недвижимость документы', pages: './RealEstateZmIm', model: 'Недвижимость документы', isrule: ['i7751-IT', 'i7751-KP#6', 'i7751-L-ServersAdmins', 'i7751-Rukovodstvo']
        }
        ], types: null, pages: null, model: null, isrule: null
      },
      {

        otdel: 'Контрольно-аналитический отдел',
        children: [{
          otdel: null,
          children: null, types: 'Допрос свидетелей', pages: './InterrogationOfWitnesses', model: 'Допрос свидетелей', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-KA', 'i7751-Rukovodstvo']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел предпроверочного анализа',
        children: [{
          otdel: null,
          children: null, types: 'Журнал налоговых нарушений', pages: './JournalPreCheck129', model: 'Журнал налоговых нарушений', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Создание карточек ЮЛ (Просмотр)', pages: './modelUl', model: 'Создание карточек ЮЛ (Просмотр)', isrule: ['i7751-IT', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-KA', 'i7751-KP#4', 'i7751-KP#7', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Книги покупок-продаж операции банка', pages: './salesBookBank', model: 'Книги покупок-продаж операции банка', isrule: ['i7751-IT', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-KA', 'i7751-KP#4', 'i7751-KP#7', 'i7751-Rukovodstvo']
        },
        {
          otdel: null,
          children: null, types: 'Модель добавления ИНН ЮЛ', pages: './preCheck', model: 'Модель добавления ИНН ЮЛ', isrule: ['i7751-IT', 'i7751-VP#2', 'i7751-L-ServersAdmins', 'i7751-PA', 'i7751-KA', 'i7751-KP#4', 'i7751-KP#5', 'i7751-KP#2', 'i7751-Rukovodstvo']
        }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел регистрации и учета НП',
        children: [
          {
            otdel: null,
            children: null, types: 'Справочники цифровизации', pages: './helpDigitalizationDocument', model: 'Справочники цифровизации', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-RiUN', 'i7751-Rukovodstvo']
          },
          {
            otdel: null,
            children: null, types: 'Цифровизация документов', pages: './digitalizationDocument', model: 'Цифровизация документов', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-RiUN', 'i7751-Rukovodstvo']
          },
          {
            otdel: null,
            children: null, types: 'Комплектация тары', pages: './container', model: 'Комплектация тары', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-RiUN', 'i7751-Rukovodstvo']
          },
          {
            otdel: null,
            children: null, types: 'Реестр НП для Уч.действий (Ввод)', pages: './regNp', model: 'Реестр НП для Уч.действий', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-RiUN', 'i7751-Rukovodstvo']
          }], types: null, pages: null, model: null, isrule: null
      },
      {
        otdel: 'Отдел расчетов с бюджетом',
        children: [{
          otdel: null,
          children: null, types: 'Аналитика уточнения платежей', pages: './payment', model: 'Модель обработки платежей', isrule: ['i7751-IT', 'i7751-L-ServersAdmins', 'i7751-RsB', 'i7751-Rukovodstvo']
        }], types: null, pages: null, model: null, isrule: null
      }
    ], types: null, pages: null, model: null, isrule: null
  }]);
}
