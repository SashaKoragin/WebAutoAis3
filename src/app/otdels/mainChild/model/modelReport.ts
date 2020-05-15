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
        children:null, types: 'Отчеты налоговых правонарушений', pages: './nalog129', model: 'Отчеты налоговых правонарушений',isrule: ['i7751-Informatizatsii','i7751-KP#2','i7751-L-ServersAdmins']
      }], types:null,pages:null,model:null,isrule:null
    }, {
      otdel:'Отдел предпроверочного анализа',
      children: [
        {
          otdel:null,
          children:null,types: 'Создание карточек ЮЛ (Просмотр)', pages:'./modelUl',model:'Создание карточек ЮЛ (Просмотр)',isrule: ['i7751-Informatizatsii','i7751-L-ServersAdmins','i7751-PAiID']
        },{
        otdel:null,
        children:null,types: 'Модель добавления ИНН ЮЛ', pages:'./preCheck',model:'Модель добавления ИНН ЮЛ',isrule: ['i7751-Informatizatsii','i7751-L-ServersAdmins','i7751-PAiID']
      }], types:null,pages:null,model:null,isrule:null
     }], types:null,pages:null,model:null,isrule:null
  }]);
}
