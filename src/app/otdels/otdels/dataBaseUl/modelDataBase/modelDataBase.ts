

export class ModelDialog {
  public row: any;
  public allDataRow: any;
  public data: ModelDataBase = new ModelDataBase()
  public selectModelMenu: ModelMenuAndModel;
}


export class ModelDataBase {

  public modelMenu: ModelMenuAndModel[] = [
    { categoria: "Учередители ЮЛ", idSelect: 8, parameterSelectProcedure: 10, keyDetal: null },
    { categoria: "Руководители и учередители", idSelect: 3, parameterSelectProcedure: 5, keyDetal: 2 },
    { categoria: "НДС", idSelect: 4, parameterSelectProcedure: 6, keyDetal: 1 },
    { categoria: "Прибыль", idSelect: 5, parameterSelectProcedure: 7, keyDetal: 1 },
    { categoria: "Баланс", idSelect: 6, parameterSelectProcedure: 8, keyDetal: 1 },
    { categoria: "Активы", idSelect: 7, parameterSelectProcedure: 9, keyDetal: 1 },
    { categoria: "Декларации на добавленную стоимость", idSelect: 1, parameterSelectProcedure: 1, keyDetal: 1 },
    { categoria: "Декларации по налогу на прибыль", idSelect: 1, parameterSelectProcedure: 3, keyDetal: 1 },
    { categoria: "Бухгалтерская (финансовая) отчетность", idSelect: 1, parameterSelectProcedure: 2, keyDetal: 1 },
  ]

  public modelDetal: ModelMenuAndModel[] = [
    { categoria: "Детализация декларации", idSelect: 2, parameterSelectProcedure: 4, keyDetal: 1 },
  ]

}



export class ModelMenuAndModel {

  public categoria: string;
  public idSelect: number;
  public parameterSelectProcedure: number;
  public keyDetal: number;
}
