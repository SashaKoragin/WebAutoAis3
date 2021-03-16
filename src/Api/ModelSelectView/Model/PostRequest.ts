import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdressService } from '../../AdressGetPost/adressService';
import { ModelSelect, LogicsSelectAutomation, TemplateProcedure } from './ParametrModel';
import { templateJitUrl } from '@angular/compiler';
import { SignalRConfiguration } from 'ng2-signalr';
import { FullSelectedModel, SenderTaxJournalOkp2, DepartamentOtdel } from '../../RequestService/modelAutomation';
import { deserializeArray } from 'class-transformer';
const url: AdressService = new AdressService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class SelectAllParametrs {
  constructor(private http: HttpClient) { }

  ///Получение шаблонов в БД
  allTemplateDataBase() {
    return this.http.get(url.allTemplate);
  }

  ///Запрос на получение генерируемых параметров
  addselectallparametrs(model: ModelSelect) {
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
  async donloadFile(modelRow: any, type: string): Promise<Blob> {
    var urls = null;
    switch (type) {
      case "TaxJournalAutoWebPage":
        urls = url.donloadFileOkp2;
        break;
      case "TaxJournal121AutoWebPage":
        urls = url.donloadFile121;
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
  ///Снятие статуса для повторной отработки
  public checkStatus(idModel: number[], status: string = null) {
    return this.http.post((status) ? url.checkStatus.concat("?status=", status) : url.checkStatus, idModel, httpOptionsJson);
  }

  //Генерация докладной записки по ЮЛ
  public noteGenerateUl(inn: string, year: string) {
    return this.http.post(url.generateNoteReportUl.concat(year), inn,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
  }

  //Генерация книг покупок и продаж на банк
  public generateBookSalesUl(inn: string, year: string) {
    return this.http.post(url.generateBookSales.concat(year), inn,
      { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
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


}
