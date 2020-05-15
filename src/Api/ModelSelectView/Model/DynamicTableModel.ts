import { MatTableDataSource } from '@angular/material/table';

export class DynamicTableColumnModel{
  //Окп2
  public selectserver:SelectTableModel[]=[
      {text:"Выборка 121 статьи", indexsevr:3,indexcolumnmodel:0},
      {text:"Выборка 129 статьи", indexsevr:2,indexcolumnmodel:1},
  ]
  //Окп2
  public mainselect:SelectTableModel = this.selectserver[0];
  //Окп2
  public columns:Table[] = [{Type:"TaxJournal121AutoWebPage", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                            {Type:"TaxJournalAutoWebPage", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                           ];
  //Предроверочный анализ
  public selectserverPre:SelectTableModel[]=[
      {text:"Добавление ИНН", indexsevr:5,indexcolumnmodel:0},
      {text:"Статусы (Отработанных веток)", indexsevr:8,indexcolumnmodel:1}
  ]
  //Предроверочный анализ
  public mainselectPre:SelectTableModel = this.selectserverPre[0];
  //Предроверочный анализ
  public columnsPre:Table[] = [{Type:"AddUlFace", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                               {Type:"ModelTree", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                              ];

  //Предроверочный анализ База данных
  public selectserverPreDataBase:SelectTableModel[]=[
    {text:"Юридические лица", indexsevr:13,indexcolumnmodel:0},
  ]
  //Предроверочный анализ База данных
  public mainselectPreDataBase:SelectTableModel = this.selectserverPreDataBase[0];
  //Предроверочный анализ База данных
  public columnsPreDataBase:Table[] = [{Type:"UlFace", Colums:[],Model:new MatTableDataSource<any>(),displayedColumns:null,allCountRow:0},
                                      ];
}

///Класс селектора
export class SelectTableModel{
  text:string;
  indexsevr:number;
  indexcolumnmodel:number;
}

export class Table{
  public Type:string;
  public Colums:Colums[] = null;
  public Model:MatTableDataSource<any> = null;
  public displayedColumns:any = null;
  public allCountRow:number = 0
 }

 export class Colums{
  public columnDef:string;
  public header:string;
  public cell :any;
  public color:string;
 }
