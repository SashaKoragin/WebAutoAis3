import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdressService } from '../../AdressGetPost/adressService';
import { ModelSelect, LogicsSelectAutomation } from './ParametrModel';
const url: AdressService = new AdressService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class SelectAllParametrs {
  constructor(private http: HttpClient) { }

  ///Запрос на получение генерируемых параметров
  addselectallparametrs(model: ModelSelect) {
    return this.http.post(url.selectparametr, model, httpOptionsJson);
  }

  ///Запрос на получение данных
  selectusersql(model: LogicsSelectAutomation) {
    return this.http.post(url.selectxml, model, httpOptionsJson);
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
  public loadInn(inn: string) {
    return this.http.post(url.addInnModel, inn, httpOptionsJson);
  }
  ///Снятие статуса для повторной отработки
  public checkStatus(idModel: number, status: string = null) {
    return this.http.post((status) ? url.checkStatus.concat("?status=", status) : url.checkStatus, idModel, httpOptionsJson);
  }

  //Генерация докладной записки по ЮЛ
  public noteGenerateUl(inn: string) {
    return this.http.post(url.generateNoteReportUl, inn,
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
  //Изменение подписывающего лица
  public actualizationSignature(signatureSenderTaxJournalOkp2: number) {
    return this.http.post(url.actualizationSignature, signatureSenderTaxJournalOkp2, httpOptionsJson);
  }
}
