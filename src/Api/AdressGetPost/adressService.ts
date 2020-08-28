export const ServerHost: string = 'I7751-W40204180';  //localhost
//export const ServerHost: string = 'localhost';
export const ServerPort: string = '8050';
//К примеру новая структура

export class AdressService {
  public identificationUser = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Identification`;
  public selectparametr = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateSqlSelect`;
  public selectxml = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Select`;
  public donloadFileOkp2 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTaxJournal`;
  public donloadFile121 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTax121`

  ///Предпроверка добавление ИНН в модель
  public addInnModel = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddInnToModel`;
  ///Снятие статуса повторной отработки
  public checkStatus = `http://${ServerHost}:${ServerPort}/ServiceAutomation/CheckStatusNone`;
  ///Генерация докладной записки для ЮЛ
  public generateNoteReportUl = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateNoteReportUl`;
  ///Генерация моделй таблиц для просмотра и анализа данных на шаблоне
  public dynamicModelTable = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ResultSelectProcedure`;
  ///Генерация выписки для просмотра
  public generateStatement = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateStatement`;
  ///Изменения актуальной подписи подписанта
  public actualizationSignature = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ActualizationSignature`;
}
