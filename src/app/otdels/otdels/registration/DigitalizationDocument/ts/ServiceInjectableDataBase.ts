
import { Recursion, TreeAllModel, ModelAllTree } from './RecursionModel';
import { SelectAndEditDataBase } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { VirtualFilter, VirtualFilterToServer } from './FilterModelInventoryOgrn';


@Injectable()
export class ChecklistDatabase {
  constructor(public select: SelectAndEditDataBase) { } //Провайдер подгруздки данных

  dataChange = new BehaviorSubject<TreeAllModel[]>([]);

  modelUserAndEquipment: Recursion = new Recursion();


  get data(): TreeAllModel[] {
    return this.dataChange.value;
  }


  async initialize(virtualFilter: VirtualFilterToServer) {
    await this.select.allOgrnInventory(virtualFilter);
    await this.select.allDirectoryDocument();
    await this.select.allInfoDocument();
    await this.select.allEventError();
    this.modelUserAndEquipment.methodModelOgrn(this.select.select?.WebSyteInventory?.OrganizationOgrnInventory);
    this.dataChange.next(this.modelUserAndEquipment.TreeAllModel);
  }


  insertItem(parent: TreeAllModel, isChild: boolean = false) {
    if (isChild) {
      this.data.find(x => x.OrganizationOgrnInventory.IdOgrn === parent.GrnInventories.IdOgrn).TreeAllModel.push(parent);
      return;
    }
    this.data.push(parent)
    this.dataChange.next(this.data);
    return;
  }


  deleteItem(parent: TreeAllModel, index: number) {
    if (parent.TreeAllModel) {
      parent.TreeAllModel = parent.TreeAllModel.filter(elem => elem.GrnInventories.IdDocGrn !== index)
      this.dataChange.next(this.data);
    }
  }

  clearAll() {
    this.data.pop();
    this.dataChange.next(this.data);
  }


  updateItem() {
    this.dataChange.next(this.data);
  }

  cancelAdd() {
    this.data.pop();
    this.dataChange.next(this.data);
  }
  ///Поиск ГРН
  findLevelModel(idFindGrn: number): TreeAllModel {
    for (let model of this.data) {
      var modelsFind = model.TreeAllModel.find(xx => xx.GrnInventories.IdDocGrn === idFindGrn)
      if (modelsFind) {
        return modelsFind;
      }
    }
    return null;
  }

}
