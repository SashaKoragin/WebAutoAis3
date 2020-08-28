//Модель выписки с сервера приложений
export class Statement {
  public HeadingStatement: HeadingStatement[]
}

export class HeadingStatement {
  public NameIndex: string;
  public StatementFull: StatementFull[];

}

export class StatementFull {
  public VarIndex: number;
  public NameParametr: string;
  public ValuesStatement: string;
}
