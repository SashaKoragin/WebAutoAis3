export class DynamicTableColumnModel{
  //Окп2
  public selectserver:SelectTableModel[]=[
      {text:"Выборка ОКП2", indexsevr:2,indexcolumnmodel:0},
  ]
  //Окп2
  public mainselect:SelectTableModel = this.selectserver[0];
  //Окп2
  public columns:Table[] = [{Type:"TaxJournalAutoWebPage", Colums:[],Model:[]},

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
  public Model:any = null;
 }

 export class Colums{
  public columnDef:string;
  public header:string;
  public cell :any;
  public color:string;
 }
