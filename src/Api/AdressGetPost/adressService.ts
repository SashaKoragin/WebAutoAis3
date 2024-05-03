export const ServerHost: string = '77068-APP065';  //localhost
//export const ServerHost: string = 'localhost';
export const ServerPort: string = '8050';
//К примеру новая структура

export class AdressService {

  public identificationUser = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Identification`;
  public selectparametr = `http://${ServerHost}:${ServerPort}/ServiceAutomation/GenerateSqlSelect`;
  public selectxml = `http://${ServerHost}:${ServerPort}/ServiceAutomation/Select`;
  public downloadFileOkp2 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTaxJournal`;
  public downloadFile121 = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileTax121`;
  public downloadFileEas = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFileEasJournal`;
  public downloadFileRequirements = `http://${ServerHost}:${ServerPort}/ServiceAutomation/LoadFile3NdflRequirements`;

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
  ///Генерация модели таблиц для просмотра и анализа данных на шаблоне
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
  public checkStatusFl = `http://${ServerHost}:${ServerPort}/ServiceAutomation/CheckStatusFl?isExecute=`;
  ///Добавление ИНН в реестр для отработки формирование справок
  public addInnFaceRegistryReference = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddInnFaceRegistryReference?userIdGuid=`;
  ///Удаление записи по ИНН
  public deleteRegistryReference = `http://${ServerHost}:${ServerPort}/ServiceAutomation/DeleteRegistryReference`;

  ///Загрузка файла списков Excel в БД
  public addFileModel = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddFileModel?userIdGuid=`;

  ///Все сотрудники организации
  public allUsersOrg = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AllUsersOrg?inn=`;
  ///Проставить признак по организации не отрабатываем допросы свидетелей
  public closedMainOrg = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ClosedMainOrg?inn=`;
  ///Аннулирование плательщика для автомата
  public closedUserOrg = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ClosedUserOrg`;
  ///Все вопросы сотруднику
  // http://localhost:8050/ServiceAutomation/SelectQuestions?idUsers=2
  public allQuestions = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectQuestions?idUsers=`;
  ///Все документы для реестра описи документов
  public allOgrnInventory = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectAllOgrnInventory`;
  ///Все документы из справочника АИС 3  http://localhost:8050/ServiceAutomation/SelectAllDirectoryDocument
  public allDirectoryDocument = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectAllDirectoryDocument`;
  ///Запрос пользовательской информации о документе
  public allInfoDocument = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectAllInfoDocument`;
  ///Все контейнеры запрос на получение
  public allDocumentContainer = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectAllDocumentContainer`;
  ///Выборка фильтра для Ретросканирования
  public selectModelFilter = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectModelFilter?userLogin=`;
  ///Добавление или редактирование дела ОГРН
  public addAndEditOrganizationOgrnInventory = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddAndEditOrganizationOgrnInventory?connectionId=`;
  ///Добавление или редактирование ГРН
  public addAndEditGrnInventory = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddAndEditGrnInventory?connectionId=`;
  ///Добавление или редактирование документа под ГРН
  public addAndEditDocumentInventory = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddAndEditDocumentInventory?connectionId=`;
  ///Добавление или редактирование краткой информации о документе
  public addAndEditAllInfoDocument = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddAndEditAllInfoDocument`;
  ///Генерация штрих-кодов
  public printBarcode = `http://${ServerHost}:${ServerPort}/ServiceAutomation/PrintBarcode`;
  ///Отчет синхронизации документов с АИС 3
  public reportSynchronization = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ReportSynchronization`;
  ///Добавление в БД контейнера ФКУ
  public addDocumentContainer = `http://${ServerHost}:${ServerPort}/ServiceAutomation/AddDocumentContainer`;
  ///Статистика о  количестве листов документов
  public reportStatisticsDocumentInventory = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ReportStatisticsDocumentInventory`;
  ///Отчет по контейнерам
  public reportDocumentContainer = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ReportDocumentContainer`;

  ///Детализация контейнера
  public reportDetailingContainer = `http://${ServerHost}:${ServerPort}/ServiceAutomation/ReportDetailingContainer`;
  ///Отчеты по всем процессам протекающим в системе
  public selectAllEventError = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectAllEventError`;

  ///Детализация отчета по процессу протекающая в системе
  public selectDetailingEventError = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SelectDetailingEventError?idProcess=`;

  ///Процедура присваивание процессу статуса готово в случае жонглирования ГРН
  public setStatusReadyProcess = `http://${ServerHost}:${ServerPort}/ServiceAutomation/SetStatusReadyProcess?idProcess=`;
  ///Удаление документа инвентаризации со статусом 1 и 5
  public deleteDocumentInventory = `http://${ServerHost}:${ServerPort}/ServiceAutomation/DeleteDocumentInventory`;
}
