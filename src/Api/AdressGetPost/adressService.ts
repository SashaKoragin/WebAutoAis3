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

  ///Получение всех шаблонов в БД Автоматизация
  public allTemplate = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadAllTemplateDb`;
  ///Предпроверка добавление ИНН в модель
  public addInnModel = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddInnToModel?userIdGuid=`;
  ///Снятие статуса повторной отработки
  public checkStatus = `http://${ServerHost}:${ServerPort}/ServiceAutomation/CheckStatusNone`;
  ///Генерация докладной записки для ЮЛ
  public generateNoteReportUl = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateNoteReportUl?year=`;
  ///Генерация докладной записки для ЮЛ
  public generateBookSales = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateBookSales?year=`;
  ///Генерация моделй таблиц для просмотра и анализа данных на шаблоне
  public dynamicModelTable = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ResultSelectProcedure`;
  ///Генерация выписки для просмотра
  public generateStatement = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateStatement`;
  ///Генерация XLSX Отчета с сервера
  public generateFileXlsxSqlView = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateFileXlsxSqlView`;
  ///Добавление новых значений в БД для автоматической обработки
  public addFileId = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddFileId`;
  ///Снятия ошибки на статусе обработки
  public checkStatusError = `http://${ServerHost}:${ServerPort}/ServiceAutomation/CheckStatusError`;
  ///Все подписанты в БД
  public allSenderGet = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AllSender`;
  ///Все Отделы и подписи Акты Решения Извещения
  public allDepartamntOtdel = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AllSenderTaxJournal`;
  ///Добавление или редактирование Отдела и подписанта к нему
  public addAndEditDepartment = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddAndEditDepartment`;

  ///Сводная книги покупок продаж
  public symmarySales = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileSummarySales`;
}
