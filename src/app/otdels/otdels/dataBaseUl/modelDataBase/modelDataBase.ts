import { Select } from '../../../../../Api/ModelSelectView/View/SelectView';
export class ModelDialog {
  public row: any;
  public data: ModelDataBase = new ModelDataBase()
  public selectModelMenu: ModelMenuAndModel;
}


export class ModelDataBase {

  public modelMenu: ModelMenuAndModel[] = [
    // { categoria: "Руководители и учередители",idSelect:100,parameterSelectProcedure:100 },
    { categoria: "Декларации на добавленную стоимость", idSelect: 1, parameterSelectProcedure: 1 },
    { categoria: "Декларации по налогу на прибыль", idSelect: 1, parameterSelectProcedure: 3 },
    { categoria: "Бухгалтерская (финансовая) отчетность", idSelect: 1, parameterSelectProcedure: 2 },
  ]

}



export class ModelMenuAndModel {

  public categoria: string;
  public idSelect: number;
  public parameterSelectProcedure: number;

}



