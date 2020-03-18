import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


export class ModelReport {
  public otdel: string;
  public isrule:string[]
  public children: ModelReport[];
  public types: string;
  public pages: string;
  public model: string;
}

@Injectable()
export class Report {

  dataChange = new BehaviorSubject<ModelReport[]>([{
    otdel: 'Отчеты по автоматам',
    children: [{
      otdel:'Отдел камеральных проверок №2',
      children: [{
        otdel:null,
        children:null, types: '129. Налоговые правонарушения', pages: './nalog129', model: '129 статья',isrule: ['i7751-Informatizatsii','i7751-KP#2','i7751-L-ServersAdmins']
      }], types:null,pages:null,model:null,isrule:null
    }], types:null,pages:null,model:null,isrule:null
  }]);

}
