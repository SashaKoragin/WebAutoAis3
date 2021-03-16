import { MatTableDataSource } from '@angular/material/table';
import { Select } from '../View/SelectView';

export class DynamicTableColumnModel {
  //Окп2
  public selectserver: SelectTableModel[] = [
    { text: "Выборка 121 статьи", indexsevr: 3, indexcolumnmodel: 0 },
    { text: "Выборка 129 статьи", indexsevr: 2, indexcolumnmodel: 1 },
  ]
  //Окп2
  public mainselect: SelectTableModel = this.selectserver[0];
  //Окп2
  public columns: Table[] = [{ Type: "TaxJournal121AutoWebPage", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "TaxJournalAutoWebPage", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Предроверочный анализ
  public selectserverPre: SelectTableModel[] = [
    { text: "Добавление ИНН", indexsevr: 5, indexcolumnmodel: 0 },
    { text: "Статусы (Отработанных веток)", indexsevr: 8, indexcolumnmodel: 1 }
  ];
  //Предроверочный анализ
  public mainselectPre: SelectTableModel = this.selectserverPre[0];
  //Предроверочный анализ
  public columnsPre: Table[] = [{ Type: "AddUlFace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "ModelTree", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Расчеты с бюджетом
  public selectserverRaschetBudg: SelectTableModel[] = [
    { text: "Анализ платежей обработаные автоматом", indexsevr: 14, indexcolumnmodel: 0 },
    { text: "Справочник КБК участвующих в автомате", indexsevr: 15, indexcolumnmodel: 1 }
  ];
  //Расчеты с бюджетом
  public mainselectRaschetBudg: SelectTableModel = this.selectserverRaschetBudg[0];
  //Расчеты с бюджетом
  public columnsRaschetBudg: Table[] = [
    { Type: "ModelKbkOnKbk", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "HelpKbkAuto", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Предроверочный анализ База данных
  public selectserverPreDataBase: SelectTableModel[] = [
    { text: "Юридические лица", indexsevr: 13, indexcolumnmodel: 0 },
    { text: "Юридические лица Анализ книг покупок/продаж с банком", indexsevr: 25, indexcolumnmodel: 1 }
  ]
  //Предроверочный анализ База данных
  public mainselectPreDataBase: SelectTableModel = this.selectserverPreDataBase[0];
  //Предроверочный анализ База данных
  public mainselectPreDataBaseBookSales: SelectTableModel = this.selectserverPreDataBase[1];
  //Предроверочный анализ База данных
  public columnsPreDataBase: Table[] = [{ Type: "UlFace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "UlFace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Выборка ЮЛ книги покупок книги продаж ОВП 2
  public selectserverOvp2: SelectTableModel[] = [
    { text: "Юридические лица книги покупок-продажи", indexsevr: 23, indexcolumnmodel: 0 },
  ]
  //Выборка ЮЛ книги покупок книги продаж ОВП 2
  public mainselectOvp2: SelectTableModel = this.selectserverOvp2[0];

  //Выборка ЮЛ книги покупок книги продаж ОВП 2
  public columnsOvp2: Table[] = [{ Type: "UlFace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];



  //Общий журнал 129
  public selectserverAll129: SelectTableModel[] = [
    { text: "Журнал 129", indexsevr: 16, indexcolumnmodel: 0 },
  ]
  //Общий журнал 129 База данных
  public mainselectAll129: SelectTableModel = this.selectserverAll129[0];

  //Общий журнал 129 База данных
  public columnsAll129: Table[] = [{ Type: "AllJournal129", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];
  //ОКП 5
  public selectserverOkp5: SelectTableModel[] = [
    { text: "Обработанные 2НДФЛ", indexsevr: 18, indexcolumnmodel: 0 },
    { text: "Ошибки 2НДФЛ", indexsevr: 19, indexcolumnmodel: 1 },
    { text: "Не обработанные 2НДФЛ", indexsevr: 20, indexcolumnmodel: 2 },
    { text: "Средний доход организации 2000", indexsevr: 22, indexcolumnmodel: 3 },
  ];
  //ОКП 5
  public mainselectOkp5: SelectTableModel = this.selectserverOkp5[1];
  //ОКП 5
  public columnsOkp5: Table[] = [
    { Type: "Documen2NDFLIdentification", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "Documen2NDFLIdentification", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "Documen2NDFLIdentification", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "FormulNdfl", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //ОКП 6
  public selectServerOkp6: SelectTableModel[] = [
    { text: "Отправленные документы плательщикам!", indexsevr: 24, indexcolumnmodel: 0 },
  ]
  //ОКП 6
  public mainselectOkp6: SelectTableModel = this.selectServerOkp6[0];
  //ОКП 6
  public columnsOkp6: Table[] = [{ Type: "DeliveryDocument", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }]

}

///Класс селектора
export class SelectTableModel {
  text: string;
  indexsevr: number;
  indexcolumnmodel: number;
}

export class Table {
  public Type: string;
  public Colums: Colums[] = null;
  public Model: MatTableDataSource<any> = null;
  public displayedColumns: any = null;
  public allCountRow: number = 0
}

export class Colums {
  public columnDef: string;
  public header: string;
  public cell: any;
  public color: string;
}
