export const ServerHost: string = '77068-APP065';  //localhost
//export const ServerHost: string = 'localhost';
export const ServerPort: string = '8050';
//К примеру новая структура

export class AdressService {
  public identificationUser = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Identification`;
  public selectparametr = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateSqlSelect`;
  public selectxml = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Select`;
  public downloadFileOkp2 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTaxJournal`;
  public downloadFile121 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTax121`
  public downloadFileEas = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileEasJournal`
  public downloadFileRequirements = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFile3NdflRequirements`

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
  ///АСК НДС ОТЧЕТ БОЛЬШОЙ
  public reportAskNds = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateReportAskNds?year=`;

  ///ОКП 3 добавление регистрационных номеров для отработки
  public addRegNumberPatent = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddRegNumberPatent?userIdGuid=`;
  ///Модель добавления ИНН
  public addFlFaceMainRegistration = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddFlFaceMainRegistration?userIdGuid=`;
  ///Принудительное завершение обработки!
  public checkStatusFl = `http://${ServerHost}:${ServerPort}/ServiceAutomation/CheckStatusFl?isExecute=`
  ///Добавление ИНН в реестр для отработки формирование справок
  public addInnFaceRegistryReference = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddInnFaceRegistryReference?userIdGuid=`;
  ///Удаление записи по ИНН
  public deleteRegistryReference = `http://${ServerHost}:${ServerPort}/ServiceAutomation/DeleteRegistryReference`;

  ///Загрузка файла списков Excel в БД
  public addFileModel = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddFileModel?userIdGuid=`;

  ///Все сотрудники организации
  public allUsersOrg = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AllUsersOrg?inn=`;

  ///Все вопросы сотруднику
  // http://localhost:8050/ServiceAutomation/SelectQuestions?idUsers=2
  public allQuestions = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectQuestions?idUsers=`;

}
