export class ModelSelect {
  constructor(public idselect: number, public idCodeProcedureselect: number = 0, public innselect: string = null, public regNumberselect: number = 0) { }
  public parametrsSelectField: ParametrsSelect = new ParametrsSelect(this.idselect, this.idCodeProcedureselect, this.innselect, this.regNumberselect)
  public logicsSelectAutomationField: LogicsSelectAutomation = null;
  public infoViewAutomationField: InfoViewAutomation[] = null;
  public parameterProcedureWebField: ParameterProcedureWeb = null;
  public resultSelectProcedureWebField: string = null;
  public templateProcedureField: TemplateProcedure = null;
  public templatePatentField: TemplatePatent = null;
  public templateInnPatternField: TemplateInnPattern = null;
}

class ParametrsSelect {
  constructor(public idselect: number, public idCodeProcedureselect: number, public innselect: string, public regNumberselect: number) {
    this.idField = idselect;
    this.idCodeProcedureField = idCodeProcedureselect;
    this.innField = innselect;
    this.regNumberField = regNumberselect;
  }
  public idField: number;
  public idCodeProcedureField: number;
  public innField: string;
  public regNumberField: number;
}

export class LogicsSelectAutomation {
  public idField: number;
  public selectInfoField: string;
  public nameDllField: string;
  public findNameSpaceField: string;
  public isResultXmlField: boolean;
  public nameReportListField: string;
  public nameReportFileField: string;
  public selectedParametrField: string;
  public selectUserField: string;
}

class InfoViewAutomation {
  public valueField: string;
  public nameTableField: string;
  public nameColumnField: string;
  public infoField: string;
  public typeColumnField: string;
  public isVisibleField: boolean;
}

class ParameterProcedureWeb {
  public idField: number;
  public selectInfoModelField: string;
  public selectParameterTableField: string;
  public modelClassFindField: string
  public parameterProcedureField: string;
  public selectUserField: string;
}

export class TemplateProcedure {
  public innField: string[];
  public idTemplateField: number;
}

export class TemplatePatent {
  public regNumberPatentField: number[];
}

export class TemplateInnPattern {
  public innField: string[];
}

//Шаблоны в БД для добавления ИНН
export class TemplateModel {
  public IdTemplate: number;
  public NameTemplate: string;
  public DateCreate: Date;
}
