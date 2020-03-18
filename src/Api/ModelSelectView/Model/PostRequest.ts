import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { AdressService } from '../../AdressGetPost/adressService';
import { ModelSelect, LogicsSelectAutomation } from './ParametrModel';
const url: AdressService = new AdressService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class SelectAllParametrs{
    constructor(private http: HttpClient) { }
   
    ///Запрос на получение генерируемых параметров
   addselectallparametrs(model:ModelSelect){
        return this.http.post(url.selectparametr,model,httpOptionsJson);
    }

    ///Запрос на получение данных
    selectusersql(model:LogicsSelectAutomation){
        return this.http.post(url.selectxml,model,httpOptionsJson);
    }

    ///Выгрузка файла
   async donloadFile(modelRow:any):Promise<Blob>{
    var blob = await this.http.post(url.donloadFileOkp2,modelRow,
        { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).toPromise().then(data=>{
          var blob = new Blob([data], { type: 'application/pdf' });
          return blob;
        });
    return blob;
    }
}
