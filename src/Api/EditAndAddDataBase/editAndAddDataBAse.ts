import { ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FullSelectedModel, INewLogicaTable, DepartamentOtdel, SenderTaxJournalOkp2 } from '../RequestService/modelAutomation';
import { EditAndAddAndDelete } from '../ModelSelectView/Model/PostRequest';
import { AuthIdentificationSignalR } from '../RequestService/requestService';
import { BroadcastEventListener } from 'ng2-signalr';
import { deserialize } from 'class-transformer';

export class TokenTableModel implements INewLogicaTable<DepartamentOtdel>{
  constructor(public editandadd: EditAndAddAndDelete, public signalR: AuthIdentificationSignalR) {
    this.subscribeservers();
  }

  public sender: SenderTaxJournalOkp2[];

  displayedColumns: any[] = ["Logic", "Id", "SenderTaxJournalOkp2.NameUser", "NameDepartament", "NameDepartamentActiveDerectory", "StatusFace", "Office", "Telephon", "ActionsColumn"];
  dataSource: MatTableDataSource<DepartamentOtdel> = new MatTableDataSource<DepartamentOtdel>();
  isAdd: boolean;
  isEdit: boolean;

  modelCancelError: DepartamentOtdel = new DepartamentOtdel();
  model: DepartamentOtdel = new DepartamentOtdel();
  modelToServer: DepartamentOtdel;
  index: number;
  modeltable: DepartamentOtdel[];

  public filterSender: any;

  //Подписка
  public subscribeAddAndUpdate: any = null;
  //public subscribeDelete: any = null;


  temlateList: any;
  rowList: any;
  fulltemplate: ElementRef<any>;
  table: ElementRef<any>;


  public subscribeservers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<DepartamentOtdel>('SubscribeDepartmentSender');
    //this.subscribeDelete = new BroadcastEventListener<DepartamentOtdel>('SubscribeDepartmentSenderDelete');
    this.signalR.conect.listen(this.subscribeAddAndUpdate);
    //this.signalR.conect.listen(this.subscribeDelete);

    // this.subscribeDelete.subscribe((model: DepartamentOtdel) => {
    //   if (model.Id === 0) {
    //     let index: number = this.dataSource.data.findIndex(item => item.Id === model.Id);
    //     this.dataSource.data.splice(index, 1);
    //     this.dataSource._updateChangeSubscription();
    //   }
    // })

    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var submodel = deserialize<DepartamentOtdel>(DepartamentOtdel, substring);
      console.log(submodel);
      this.index = 0;
      if (this.isEdit) {
        this.isEditAndAddFalse();
        this.removetemplate();
        this.model = submodel
      }
      var index = this.dataSource.data.find(x => x.Id === submodel.Id);
      var indexzero = this.dataSource.data.find(x => x.Id === 0);
      try {
        if (indexzero) {
          ///Для изменявшего
          this.dataSource.data.find(x => x.Id === 0).Id = submodel.Id;
        }
        else {
          if (index) {
            ///Для остальных пользователей изменение
            this.dataSource.data[this.dataSource.data.indexOf(index)] = submodel;
            this.modeltable[this.modeltable.indexOf(index)] = submodel;
          }
          else {
            ///Для остальных пользователей добавление
            this.dataSource.data.push(submodel);
            this.modeltable.push(submodel);
          }
        }
        this.dataSource._updateChangeSubscription();
      }
      catch (e) {
        console.log(e);
      }
    });
  }


  castomefiltermodel() {
    this.dataSource.filterPredicate = (data, filter) => {
      var tot = false;
      for (let column of this.displayedColumns) {
        if (typeof data[column] !== 'undefined') {
          if ((column in data) && (new Date(data[column].toString()).toString() == "Invalid Date")) {
            tot = (tot || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          } else {

            var date = new Date(data[column].toString());
            var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
            tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
          }
        }
        else {
          if (data[column.split('.')[0]] !== null) {
            if (typeof (data[column.split('.')[0]]) === 'object') {
              if (typeof (data[column.split('.')[0]][column.split('.')[1]]) === 'object') {
                if (data[column.split('.')[0]][column.split('.')[1]][column.split('.')[2]]) {
                  tot = (tot || data[column.split('.')[0]][column.split('.')[1]][column.split('.')[2]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                }
              }
              else {
                if (data[column.split('.')[0]][column.split('.')[1]]) {
                  tot = (tot || data[column.split('.')[0]][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                }
              }
            }
          }
        }
      }
      return tot;
    }
  }



  async delay(ms: number): Promise<void> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  async addtemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.temlateList = this.fulltemplate.nativeElement.querySelectorAll("mat-form-field[id=template]");
    this.rowList = this.table.nativeElement.querySelectorAll("div[class='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.temlateList[i])
      i++;
    }
  }

  removetemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.temlateList[i]);
      this.fulltemplate.nativeElement.append(this.temlateList[i])
      i++;
    }
  }

  public async add(): Promise<void> {
    this.isEditAndAddTrue();
    var newmodel = this.newmodel();
    this.dataSource.data.push(newmodel);
    this.modeltable.push(newmodel);
    this.index = this.dataSource.data.length;
    this.model = newmodel;
    await this.dataSource._updateChangeSubscription();
    await this.dataSource.paginator.lastPage();
    this.addtemplate(newmodel.Id)
  }

  edit(model: DepartamentOtdel): void {
    model.ModelIsEdit = true;
    this.modelCancelError = JSON.parse(JSON.stringify(model));
    this.model = JSON.parse(JSON.stringify(model));
    this.addtemplate(model.Id);
    this.isEditAndAddTrue();
  }

  save(): void {
    this.modifimethod();
    this.modelToServer = JSON.parse(JSON.stringify(this.model));
    this.editandadd.addAndUpdateSenderTaxJourna(this.modelToServer).toPromise().then((model: DepartamentOtdel) => {
      if (model === null) {
        alert("Во время сохранения произошла ошибка!")
        this.cancel(this.modelCancelError);
      }
    });
    //Запрос на сохранение и обновление данных
  }

  delete(model: DepartamentOtdel): void {
    alert('Удаление не реализованно (Не требуется)!');
  }

  cancel(model: DepartamentOtdel): void {
    model.ModelIsEdit = false;
    this.isEditAndAddFalse();
    if (this.index > 0) {
      this.dataSource.data.pop();
      this.index = 0;
    }
    else {
      var userdefault = this.modeltable.find(x => x.Id === this.model.Id);
      this.dataSource.data[this.modeltable.indexOf(userdefault)] = model;
      this.index = 0;
    }
    this.dataSource._updateChangeSubscription();
    this.removetemplate();
    this.calbackfiltersAll();
  }

  newmodel(): DepartamentOtdel {
    var newuser: DepartamentOtdel = new DepartamentOtdel()
    newuser.ModelIsEdit = true;
    newuser.Id = 0;
    return newuser;
  }

  filterstable(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  calbackfiltersAll(): void {
    this.filterSender = this.sender.slice();
  }

  modifimethod(): void {
    this.model.SenderTaxJournalOkp2 ? this.model.IdSender = this.model.SenderTaxJournalOkp2.Id : this.model.IdSender = null;
    this.isEdit = true;
    this.model.ModelIsEdit = false;
  }

  async addtableModel(model: FullSelectedModel, paginator: MatPaginator, sort: MatSort, table: ElementRef<any>, template: ElementRef<any>): Promise<string> {
    this.table = table;  //Таблица
    this.fulltemplate = template; //Заложенный шаблон
    this.modeltable = JSON.parse(JSON.stringify(model.DepartamentOtdel));
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.dataSource.data = model.DepartamentOtdel;
    this.sender = model.SenderTaxJournalOkp2;
    this.filterSender = this.sender.slice();
    this.castomefiltermodel();
    return "Модель отделов и подписантов подгруженна!"
  }


  isEditAndAddTrue(): void {
    this.isEdit = true;
    this.isAdd = true;
  }

  isEditAndAddFalse(): void {
    this.isAdd = false;
    this.isEdit = false;
  }

}
