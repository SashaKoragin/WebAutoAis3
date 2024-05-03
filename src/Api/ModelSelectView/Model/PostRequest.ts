import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdressService } from '../../AdressGetPost/adressService';
import { ModelSelect, LogicsSelectAutomation, TemplateProcedure, TemplatePatent, TemplateInnPattern } from './ParametrModel';
import { FullSelectedModel, SenderTaxJournalOkp2, DepartamentOtdel, UserOrg, QuestionsAndUsers, OrganizationOgrnInventory, GrnInventories, DirectoryDocument, DocumentInventories, InfoDocument, DocumentContainer, WebSyteInventory, EventProcessError, AisGrnEventErrorModel } from '../../RequestService/modelAutomation';
import { deserializeArray, deserialize } from 'class-transformer';
import { UploadFile } from '../../ModelTable/FileModel';
import { VirtualFilter, VirtualFilterToServer } from '../../../app/otdels/otdels/registration/DigitalizationDocument/ts/FilterModelInventoryOgrn';


const url: AdressService = new AdressService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class SelectModel {
  UserOrg: UserOrg[];
  QuestionsAndUsers: QuestionsAndUsers[];
}

@Injectable()
export class SelectAllParameter {
  constructor(private http: HttpClient) { }

  public select: SelectModel = new SelectModel();



  //Вытащить всех сотрудников
  async allUsers(Inn: string) {
    this.select.UserOrg = await this.http.get(url.allUsersOrg.concat(Inn), httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<UserOrg>(UserOrg, model.toString());
      }
    });
  }

  //Проставить признак завершение обработки организации
  async closedMainOrg(Inn: string) {
    await this.http.post(url.closedMainOrg.concat(Inn), httpOptionsJson).toPromise().then((model) => {
      if (model) {
        alert(model);
      }
    });
  }
  //Проставить признак плательщик анулирован
  async closedUserOrg(userOrg: UserOrg) {
    await this.http.post(url.closedUserOrg, userOrg, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        alert(model);
      }
    });
  }

  async allQuestions(idUser: string) {
    this.select.QuestionsAndUsers = await this.http.get(url.allQuestions + idUser, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<QuestionsAndUsers>(QuestionsAndUsers, model.toString());
      }
    });
  }

  ///Получение шаблонов в БД
  allTemplateDataBase() {
    return this.http.get(url.allTemplate);
  }

  public addFileModel(upload: UploadFile, UserGuid: string) {
    return this.http.post(url.addFileModel.concat(UserGuid), upload, httpOptionsJson);
  }

  ///Запрос на получение генерируемых параметров
  addSelectAllParameter(model: ModelSelect) {
    return this.http.post(url.selectparametr, model, httpOptionsJson);
  }

  ///Запрос на получение данных
  selectusersql(model: LogicsSelectAutomation) {
    return this.http.post(url.selectxml, model, httpOptionsJson);
  }
  ///model под методом selecting.generatecommand() для генерации полного отчета
  async generateXlsxServer(model: LogicsSelectAutomation, nameViewReport: string) {
    return this.http.post(url.generateFileXlsxSqlView, model, {
      responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(async model => {
      var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = nameViewReport;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  ///Генерация сводной таблицы продаж
  async generateSummarySales(inn: string) {
    return this.http.post(url.symmarySales, inn, {
      responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(async model => {
      var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'Сводная по покупкам ' + inn;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }




  ///Выгрузка файла
  async downloadFile(modelRow: any, type: string): Promise<Blob> {
    var urls = null;
    switch (type) {
      case "TaxJournalAutoWebPage":
        urls = url.downloadFileOkp2;
        break;
      case "TaxJournal121AutoWebPage":
        urls = url.downloadFile121;
        break;
      case "TaxEasJournal":
        urls = url.downloadFileEas;
        break;
      case "Declaration3Ndfl":
        urls = url.downloadFileRequirements;
        break;
      default:
        urls = null;
        break;
    }
    console.log(urls);
    if (urls) {
      var blob = await this.http.post(urls, modelRow,
        { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).toPromise().then(data => {
          var blob = new Blob([data], { type: 'application/pdf' });
          return blob;
        });
      return blob;
    }
    return null;
  }
  ///Загрузка ИНН для отработки
  public loadInn(templateModel: TemplateProcedure, guidUser: string) {
    return this.http.post(url.addInnModel.concat(guidUser), templateModel, httpOptionsJson);
  }
  ///Загрузка регистрационных номеров патента
  public loadRegNumberPatent(templatePatent: TemplatePatent, guidUser: string) {
    return this.http.post(url.addRegNumberPatent.concat(guidUser), templatePatent, httpOptionsJson);
  }
  ///Загрузка ИНН для регистрации
  public loadInnRegistration(templateInnPattern: TemplateInnPattern, guidUser: string) {
    return this.http.post(url.addFlFaceMainRegistration.concat(guidUser), templateInnPattern, httpOptionsJson);
  }
  ///Загрузка ИНН для регистрации
  public loadInnOrn(templateInnPattern: TemplateInnPattern, guidUser: string) {
    return this.http.post(url.addInnFaceRegistryReference.concat(guidUser), templateInnPattern, httpOptionsJson);
  }
  ///Удаление записи из журнала
  public deleteInn(inn: string) {
    return this.http.post(url.deleteRegistryReference, inn, httpOptionsJson);
  }

  ///Снятие статуса для повторной отработки
  public checkStatus(idModel: number[], status: string = null) {
    return this.http.post((status) ? url.checkStatus.concat("?status=", status) : url.checkStatus, idModel, httpOptionsJson);
  }
  ///Принудительное завершение обработки!
  public checkStatusFl(inn: string, isExecute: boolean) {
    return this.http.post(url.checkStatusFl.concat(isExecute.toString()), inn, httpOptionsJson);
  }
  //Генерация докладной записки по ЮЛ
  public noteGenerateUl(inn: string, year: string) {
    return this.http.post(url.generateNoteReportUl.concat(year), inn,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  //Генерация книг покупок и продаж на банк
  public generateBookSalesUl(inn: string, year: string) {
    return this.http.post(url.generateBookSales.concat(year), inn,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  //АСК НДС полный отчет
  public generateAskNds(inn: string, year: string) {
    return this.http.post(url.reportAskNds.concat(year), inn,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  //Запрос на модели таблиц для разкладки динамически
  public detalDataBaseNote(modelParameter: ModelSelect) {
    return this.http.post(url.dynamicModelTable, modelParameter, httpOptionsJson);
  }

  //Генерация выписки для анализа
  public generateStatementUl(modelParameter: ModelSelect) {
    return this.http.post(url.generateStatement, modelParameter,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }


  //Добавление Ун файлов в БД для отработки документов
  public addIdFileTodataBase(arrayNumber: number[]) {
    return this.http.post(url.addFileId, arrayNumber, httpOptionsJson);
  }
  ///Снятие статуса ошибки на моделе или на множестве объектов
  public isChekModel(arrayNumber: number[]) {
    return this.http.post(url.checkStatusError, arrayNumber, httpOptionsJson);
  }
}

@Injectable()
export class SelectAndEditDataBase {

  constructor(private http: HttpClient) { }

  ///Модель Базы Данных
  public select: FullSelectedModel = new FullSelectedModel();


  //Фильтр модели для Ретросканиррования
  async selectVirtualFilter(userLogin: string) {
    this.select.VirtualFilter = await this.http.get(url.selectModelFilter.concat(userLogin), httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<VirtualFilter>(VirtualFilter, model.toString());
      }
    });
  }

  //Вытащить всех сотрудников
  async allOgrnInventory(virtualFilter: VirtualFilterToServer) {
    this.select.WebSyteInventory = await this.http.post(url.allOgrnInventory, virtualFilter, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserialize<WebSyteInventory>(WebSyteInventory, model.toString());
      }
    });
  }
  ///Справочник документов
  async allDirectoryDocument() {
    this.select.DirectoryDocument = await this.http.get(url.allDirectoryDocument, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<DirectoryDocument>(DirectoryDocument, model.toString());
      }
    });
  }

  ///Загрузка всех процессов протекающих в системе
  async allEventError() {
    this.select.EventProcessError = await this.http.get(url.selectAllEventError, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<EventProcessError>(EventProcessError, model.toString());
      }
    });
  }

  ///Детализация процессов в системе
  async allDetailingEventError(idProcess: number) {
    this.select.AisGrnEventErrorModel = await this.http.get(url.selectDetailingEventError.concat(idProcess.toString()), httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<AisGrnEventErrorModel>(AisGrnEventErrorModel, model.toString());
      }
    });

  }
  //Процедура присваивание процессу статуса готово в случае жонглирования ГРН
  async setStatusReadyProcess(idProcess: number) {
    await this.http.post(url.setStatusReadyProcess.concat(idProcess.toString()), httpOptionsJson).toPromise().then((message) => {
      if (message) {
        alert(message);
      }
    });

  }

  ///Справочник пользователя краткая информация о документе
  async allInfoDocument() {
    this.select.InfoDocument = await this.http.get(url.allInfoDocument, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<InfoDocument>(InfoDocument, model.toString());
      }
    });
  }
  ///Запрос всех внесенных контейнеров в БД
  async allDocumentContainer() {
    this.select.DocumentContainer = await this.http.get(url.allDocumentContainer, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        return deserializeArray<DocumentContainer>(DocumentContainer, model.toString());
      }
    });
  }

  ///Выборка всех подписантов
  private async allSenderTaxJournal() {
    this.select.SenderTaxJournalOkp2 = await this.http.get(url.allSenderGet, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        var senderTaxJournal = deserializeArray<SenderTaxJournalOkp2>(SenderTaxJournalOkp2, model.toString());
        return senderTaxJournal
      }
    });
  }

  ///Выборка из БД всех отделов и подписантов к ним
  private async allSender() {
    this.select.DepartamentOtdel = await this.http.get(url.allDepartamntOtdel, httpOptionsJson).toPromise().then((model) => {
      if (model) {
        var departamentOtdel = deserializeArray<DepartamentOtdel>(DepartamentOtdel, model.toString());
        return departamentOtdel
      }
    });
  }

  ///Загрузка подписантов и Отделов
  public async SenderDepartment() {
    await this.allSenderTaxJournal();
    await this.allSender()
  }

}


@Injectable()
export class EditAndAddAndDelete {
  constructor(private http: HttpClient) { }

  //Редактирование или добавление отдела и подписи
  addAndUpdateSenderTaxJourna(department: DepartamentOtdel) {
    return this.http.post(url.addAndEditDepartment, department, httpOptionsJson);
  }
  //Редактирование или добавление ОГРН
  addAndUpdateOrganizationOgrnInventory(organizationOgrnInventory: OrganizationOgrnInventory, connectionId: string) {
    return this.http.post(url.addAndEditOrganizationOgrnInventory.concat(connectionId), organizationOgrnInventory, httpOptionsJson);
  }

  ///Добавление ГРН документов
  addAndUpdateGrnInventory(grnInventories: GrnInventories, connectionId: string) {
    return this.http.post(url.addAndEditGrnInventory.concat(connectionId), grnInventories, httpOptionsJson);
  }
  ///Добавление ГРН документов
  addAndEditDocumentInventory(documentInventory: DocumentInventories, connectionId: string) {
    return this.http.post(url.addAndEditDocumentInventory.concat(connectionId), documentInventory, httpOptionsJson);
  }
  ///Удаление документа инвентаризации со статусом 1 и 5
  deleteDocumentInventory(documentInventory: DocumentInventories) {
    return this.http.post(url.deleteDocumentInventory, documentInventory, httpOptionsJson);
  }


  ///Добавление или обновление краткой информации о документе
  addAndUpdateInfoDocument(infoDocument: InfoDocument) {
    return this.http.post(url.addAndEditAllInfoDocument, infoDocument, httpOptionsJson);
  }

  ///Добавление тары документа ФКУ
  addDocumentContainer(documentContainer: DocumentContainer) {
    return this.http.post(url.addDocumentContainer, documentContainer, httpOptionsJson);
  }
  ///Отчет по таре
  printReportContainer(documentContainer: DocumentContainer) {
    this.http.post(url.reportDocumentContainer, documentContainer,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "Отчет по таре - " + documentContainer.BarcodeContainer;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  ///Печать детализации контейнера
  printDetailingContainer(documentContainer: DocumentContainer) {
    this.http.post(url.reportDetailingContainer, documentContainer,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "Детализация - " + documentContainer.BarcodeContainer;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
  ///Генерация Штрих-кодов
  createBarcode(grnInventories: GrnInventories) {
    this.http.post(url.printBarcode, grnInventories,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
        if (model.byteLength === 0) {
          alert("В данной группе ГРН возникла ошибка требуется исправить и перезапустить процесс!!!")
          return;
        }
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "BarCode-" + grnInventories.IdDocGrn;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

  ///Отчет для просмотра синхронизации
  createReportSynchronization(grnInventories: GrnInventories) {
    this.http.post(url.reportSynchronization, grnInventories,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "Отчет синхронизации-" + grnInventories.IdDocGrn;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
  //Отчет о статистики документов
  reportStatisticsDocumentInventory() {
    this.http.post(url.reportStatisticsDocumentInventory, null,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(model => {
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "Отчет статистики";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }

}
