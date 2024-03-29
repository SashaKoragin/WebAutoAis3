//Модель годов
export class YearModeReport {
  constructor() {
    this.AddYears();
  }

  public yearsModel: string[] = [];
  public selectedYears: string;

  public AddYears() {
    var todayYear = new Date().getFullYear();
    for (var year = 2020; year <= todayYear; year++) {
      this.yearsModel.push(year.toString());
    }
  }
}


export class ModelDialog {
  constructor(modelMenu: ModelMenuAndModel[], modelMenuDetalization: ModelMenuAndModel[]) {
    this.modelMenu = modelMenu;
    this.modelMenuDetalization = modelMenuDetalization;
  }
  public row: RowModel = new RowModel();
  public allDataRow: any;
  public modelMenu: ModelMenuAndModel[];
  public modelMenuDetalization: ModelMenuAndModel[];
  public selectModelMenu: ModelMenuAndModel;
  public isUl: boolean;
}

export class RowModel {

  public Fid: number = null;
  public Name: string = null;
  public Inn: string = null;
  public Kpp: string = null;
  public Ogrn: string = null;
  public Address: string = null;
  public Status: string = null;
  public RegNumber: number = 0;
  public IndexId: number = 0;
}


export class ModelDataBase {

  public modelMenu: ModelMenuAndModel[] = [
    { categoria: "Учередители ЮЛ", idSelect: 8, parameterSelectProcedure: 10, keyDetal: null },
    { categoria: "Учередители из выписки", idSelect: 11, parameterSelectProcedure: 13, keyDetal: 2 },
    { categoria: "Руководители и учередители", idSelect: 3, parameterSelectProcedure: 5, keyDetal: 2 },
    { categoria: "Выписка", idSelect: 12, parameterSelectProcedure: 14, keyDetal: null },
    { categoria: "Счета", idSelect: 10, parameterSelectProcedure: 12, keyDetal: null },
    { categoria: "НДС", idSelect: 4, parameterSelectProcedure: 6, keyDetal: 1 },
    { categoria: "Прибыль", idSelect: 5, parameterSelectProcedure: 7, keyDetal: 1 },
    { categoria: "Баланс", idSelect: 6, parameterSelectProcedure: 8, keyDetal: 1 },
    { categoria: "Активы", idSelect: 7, parameterSelectProcedure: 9, keyDetal: 1 },
    { categoria: "Декларации на добавленную стоимость", idSelect: 1, parameterSelectProcedure: 1, keyDetal: 1 },
    { categoria: "Декларации по налогу на прибыль", idSelect: 1, parameterSelectProcedure: 3, keyDetal: 1 },
    { categoria: "Бухгалтерская (финансовая) отчетность", idSelect: 1, parameterSelectProcedure: 2, keyDetal: 1 },

  ]
  //Детализация по индексу 1,2,3,4,5 и т. д.
  public modelDetal: ModelMenuAndModel[] = [
    { categoria: "Детализация декларации", idSelect: 2, parameterSelectProcedure: 4, keyDetal: 1 },
    { categoria: "Объекты имущества лица", idSelect: 9, parameterSelectProcedure: 11, keyDetal: 2 },
    // { categoria: "Будущая детализация", idSelect: NN, parameterSelectProcedure: NN, keyDetal: 3 },
  ]

  public modelMenuOvp2: ModelMenuAndModel[] = [
    { categoria: "Книги покупок/продаж", idSelect: 13, parameterSelectProcedure: 15, keyDetal: null }
  ]

  //Модель патентов внутрености
  public modelMenuOkp3: ModelMenuAndModel[] = [
    { categoria: "Документы объекта ПСН", idSelect: 14, parameterSelectProcedure: 1, keyDetal: null },
    { categoria: "Сведения о месте осуществления деятельности", idSelect: 15, parameterSelectProcedure: 2, keyDetal: null },
    { categoria: "Сведения о транспортных средствах", idSelect: 16, parameterSelectProcedure: 3, keyDetal: null },
    { categoria: "Сведения об обособленных объектах", idSelect: 17, parameterSelectProcedure: 4, keyDetal: null },
    { categoria: "Параметры расчета налога", idSelect: 18, parameterSelectProcedure: 5, keyDetal: null },
    { categoria: "Сведения по фактическому действию патента", idSelect: 19, parameterSelectProcedure: 6, keyDetal: null }
  ]


}



export class ModelMenuAndModel {

  public categoria: string;
  public idSelect: number;
  public parameterSelectProcedure: number;
  public keyDetal: number;
}
