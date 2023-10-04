import { MatTableDataSource } from '@angular/material/table';
import { Select } from '../View/SelectView';

export class DynamicTableColumnModel {
  //Окп2
  public selectserver: SelectTableModel[] = [
    { text: "Выборка 119 статьи", indexsevr: 2, indexcolumnmodel: 0 },
    { text: "Выборка 129 статьи", indexsevr: 1, indexcolumnmodel: 1 },
  ]
  //Окп2
  public mainselect: SelectTableModel = this.selectserver[0];
  //Окп2
  public columns: Table[] = [{ Type: "TaxJournal121AutoWebPage", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "TaxJournalAutoWebPage", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Предроверочный анализ
  public selectserverPre: SelectTableModel[] = [
    { text: "Добавление ИНН", indexsevr: 4, indexcolumnmodel: 0 },
    { text: "Статусы (Отработанных веток)", indexsevr: 7, indexcolumnmodel: 1 }
  ];
  //Предроверочный анализ
  public mainselectPre: SelectTableModel = this.selectserverPre[0];
  //Предроверочный анализ
  public columnsPre: Table[] = [{ Type: "AddUlFaceWeb", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  { Type: "ModelTree", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Расчеты с бюджетом
  public selectserverRaschetBudg: SelectTableModel[] = [
    { text: "Анализ платежей обработаные автоматом", indexsevr: 13, indexcolumnmodel: 0 },
    { text: "Справочник КБК участвующих в автомате", indexsevr: 14, indexcolumnmodel: 1 }
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
    { text: "Юридические лица", indexsevr: 12, indexcolumnmodel: 0 },
    { text: "Юридические лица Анализ книг покупок/продаж с банком", indexsevr: 23, indexcolumnmodel: 1 }
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
    { text: "Юридические лица книги покупок-продажи", indexsevr: 21, indexcolumnmodel: 0 },
  ]
  //Выборка ЮЛ книги покупок книги продаж ОВП 2
  public mainselectOvp2: SelectTableModel = this.selectserverOvp2[0];

  //Выборка ЮЛ книги покупок книги продаж ОВП 2
  public columnsOvp2: Table[] = [{ Type: "UlFace", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];



  //Общий журнал 129
  public selectserverAll129: SelectTableModel[] = [
    { text: "Журнал 129", indexsevr: 15, indexcolumnmodel: 0 },
  ]
  //Общий журнал 129 База данных
  public mainselectAll129: SelectTableModel = this.selectserverAll129[0];

  //Общий журнал 129 База данных
  public columnsAll129: Table[] = [{ Type: "AllJournal129", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];


  //ОКП 1
  public selectServerOkp1: SelectTableModel[] = [
    { text: "Нарушения ОКП 1", indexsevr: 28, indexcolumnmodel: 0 },
    { text: "Журнал ЕАС", indexsevr: 31, indexcolumnmodel: 1 },
  ]
  //ОКП 1
  public mainselectOkp1: SelectTableModel = this.selectServerOkp1[0];
  //ОКП 1
  public columnsOkp1: Table[] = [
    { Type: "TaxJournal121Error", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "TaxEasJournal", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }
  ]





  //ОКП 5
  public selectserverOkp5: SelectTableModel[] = [
    { text: "Обработанные 2НДФЛ", indexsevr: 16, indexcolumnmodel: 0 },
    { text: "Ошибки 2НДФЛ", indexsevr: 17, indexcolumnmodel: 1 },
    { text: "Не обработанные 2НДФЛ", indexsevr: 18, indexcolumnmodel: 2 },
    { text: "Средний доход организации 2000", indexsevr: 20, indexcolumnmodel: 3 },
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
    { text: "Отправленные документы плательщикам!", indexsevr: 22, indexcolumnmodel: 0 },
    { text: "Деклараций 3НДФЛ!", indexsevr: 32, indexcolumnmodel: 1 },
    { text: "Журнал требований 3НДФЛ", indexsevr: 34, indexcolumnmodel: 2 },
    { text: "Недвижимость документы купли/продажи", indexsevr: 35, indexcolumnmodel: 3 }
  ]
  //ОКП 6
  public mainselectOkp6: SelectTableModel = this.selectServerOkp6[0];
  //ОКП 6
  public columnsOkp6: Table[] = [
    { Type: "DeliveryDocument", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "TaxDeclarationFl", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "Declaration3Ndfl", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "RealEstateZmIm", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },

  ]


  ///ОКП 3
  public selectserverОкp3: SelectTableModel[] = [
    { text: "Собранные патенты", indexsevr: 24, indexcolumnmodel: 0 },
    { text: "Патенты", indexsevr: 26, indexcolumnmodel: 1 }
  ];

  ///ОКП 3
  public columnsОкp3: Table[] = [
    { Type: "IsPatentParses", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    { Type: "AllPatent", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 }
  ];

  //Регистрация и учет налогоплательщиков
  public selectserverRegistration: SelectTableModel[] = [
    { text: "Реестр ФЛ учетные действия", indexsevr: 29, indexcolumnmodel: 0 },
  ];

  //Регистрация и учет налогоплательщиков
  public columnsRegistration: Table[] = [
    { Type: "AllJournalRegistrationFl", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

  //Отдел работы с налогоплательщиками
  public selectOrn: SelectTableModel[] = [
    { text: "Реестр ФЛ формирование документов", indexsevr: 37, indexcolumnmodel: 0 },
  ];

  //Регистрация и учет налогоплательщиков
  public columnsOrn: Table[] = [
    { Type: "FaceRegistryReference", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
  ];

    //Отдел работы с налогоплательщиками
    public selectKao: SelectTableModel[] = [
      { text: "Выборка организаций и вопросов сведетелям", indexsevr: 39, indexcolumnmodel: 0 },
    ];

    //Регистрация и учет налогоплательщиков
    public columnsKao: Table[] = [
      { Type: "MainOrgAndQuestions", Colums: [], Model: new MatTableDataSource<any>(), displayedColumns: null, allCountRow: 0 },
    ];

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
