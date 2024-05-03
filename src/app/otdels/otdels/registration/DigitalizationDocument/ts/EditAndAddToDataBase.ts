import { ChecklistDatabase } from './ServiceInjectableDataBase';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { EditAndAddAndDelete } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { TreeAllModel, ModelAllTree } from './RecursionModel';
import { OrganizationOgrnInventory } from 'src/Api/RequestService/modelAutomation';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ElementRef } from '@angular/core';
import { BroadcastEventListener } from 'ng2-signalr';
import { deserialize } from 'class-transformer';
import { ModelValidation } from './ModelValidationTree';


export class EditAndAddOrganizationOgrnInventory {

  constructor(public editAndAdd: EditAndAddAndDelete,
    public signalR: AuthIdentificationSignalR,
    private _database: ChecklistDatabase,
    private treeControl: FlatTreeControl<ModelAllTree>,
    private flatNodeMap: Map<ModelAllTree, TreeAllModel>,) {
    this.subscribeServers();
  }

  public async initialize(template: ElementRef, templateTree: ElementRef, userLogin: string, connectionId: string) {
    this.templateTree = templateTree;
    this.fullTemplate = template;
    this.loginUser = userLogin;
    this.connectionId = connectionId;
  }

  public connectionId: string;
  public loginUser: string;
  public modelValid: ModelValidation = new ModelValidation()
  //Индекс клиента
  index: number;
  //Подписка
  public subscribeAddAndUpdate: any = null;
  //В случае отмены редактирования
  modelCancelError: OrganizationOgrnInventory = new OrganizationOgrnInventory();
  ///Шаблонизация
  model: OrganizationOgrnInventory = new OrganizationOgrnInventory();
  fullTemplate: ElementRef<any>  //Полный шаблон для манипуляции
  templateTree: ElementRef<any>  //Шаблон дерева элементов
  templateList: any //Заложенный шаблон Массив
  rowList: any   //Строка по номеру из Tree Массива
  nodeClient: ModelAllTree
  ///Признаки добавления или редактирования
  isAdd: boolean;
  isEdit: boolean;

  public subscribeServers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<OrganizationOgrnInventory>('SubscribeOrganizationOgrnInventory');
    this.signalR.connect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var subModel = deserialize<OrganizationOgrnInventory>(OrganizationOgrnInventory, substring);
      console.log(subModel);
      this.index = 0;
      if (this.isEdit) {
        if (this.model.IdOgrn !== subModel.IdOgrn) {
          console.log(subModel.IdOgrn);
          this.cancel(this.nodeClient, subModel.IdOgrn);
        }
        else {
          this.isEditAndAddFalse();
          this.removeTemplate();
          this.model.ModelIsEdit = false;
          this.modelCancelError.ModelIsEdit = false;
        }
      }
      var modelFind = this._database.data.find(x => x.OrganizationOgrnInventory.IdOgrn === subModel.IdOgrn);
      var indexZero = this._database.data.find(x => x.OrganizationOgrnInventory.IdOgrn === 0);
      try {
        ///Добавление модели если
        if (indexZero) {
          this.model.ModelIsEdit = false;
          // const parentNode = this.flatNodeMap.get(this.nodeClient);
          indexZero.OrganizationOgrnInventory = JSON.parse(JSON.stringify(subModel));
          ///Для изменявшего
        }
        else {
          ///Найденная модель
          if (modelFind) {
            modelFind.OrganizationOgrnInventory = JSON.parse(JSON.stringify(subModel));
          }
          else {
            ///Для остальных пользователей добавление
            var treeModel = new TreeAllModel();
            treeModel.OrganizationOgrnInventory = JSON.parse(JSON.stringify(subModel));
            treeModel.TreeAllModel = [];
            treeModel.GrnInventories = null;
            treeModel.DocumentInventories = null;
            treeModel.UserLoginModel = this.loginUser;
            this._database.insertItem(treeModel!, false);
          }
        }
        this._database.updateItem();
      }
      catch (e) {
        console.log(e);
      }
    });
  }


  ///Глобальный элемент ОГРН добавление
  public addRoot() {
    if (this.isEdit) {
      alert("Завершите предыдущее редактирование!")
      return;
    }
    var treeModel = new TreeAllModel();
    this.model = this.newModel();
    treeModel.OrganizationOgrnInventory = this.model;
    treeModel.TreeAllModel = [];
    treeModel.GrnInventories = null;
    treeModel.DocumentInventories = null;
    treeModel.UserLoginModel = this.loginUser;
    this._database.insertItem(treeModel!, false);
    this._database.data.reverse();
    this._database.updateItem();
    this.isEditAndAddTrue();
    this.modelCancelError = JSON.parse(JSON.stringify(this.model));
    this.addTemplate(this.model.IdOgrn)
  }

  isHiddenAndNotHidden(node: ModelAllTree, model: OrganizationOgrnInventory, isHidden: boolean) {
    if (node.model.UserLoginModel === this.loginUser) {
      model.IsHiddenWeb = isHidden;
      this.modelCancelError = JSON.parse(JSON.stringify(model));
      this.model = JSON.parse(JSON.stringify(model));
      this.save(node);
    }
    else {
      alert("Нельзя скрывать/раскрывать чужие ОГРН!!!")
    }
  }

  delete(node: ModelAllTree, model: OrganizationOgrnInventory): void {
    alert('Не надо так делать!');
  }

  edit(node: ModelAllTree, model: OrganizationOgrnInventory): void {
    if (node.model.UserLoginModel === this.loginUser) {
      this.nodeClient = node;
      model.ModelIsEdit = true
      this.model.ModelIsEdit = true;
      this.modelCancelError = JSON.parse(JSON.stringify(model));
      this.model = JSON.parse(JSON.stringify(model));
      this.isEditAndAddTrue();
      this.addTemplate(this.model.IdOgrn);
    }
    else {
      alert("Редактирование чужих ОГРН запрещено!!!");
    }


  }

  newModel(): OrganizationOgrnInventory {
    var newModel: OrganizationOgrnInventory = new OrganizationOgrnInventory()
    newModel.ModelIsEdit = true;
    newModel.IdOgrn = 0;
    newModel.UserLogin = this.loginUser;
    newModel.IdStatus = 1;
    return newModel;
  }

  cancel(node: ModelAllTree, idexSubModel: number): void {
    this.modelCancelError.ModelIsEdit = false;
    if (this.modelCancelError.IdOgrn === 0) {
      if (idexSubModel === 0) {
        this._database.data.reverse();
        this._database.cancelAdd();
      }
    }
    else {
      const parentNode = this.flatNodeMap.get(node);
      parentNode.OrganizationOgrnInventory = JSON.parse(JSON.stringify(this.modelCancelError));
      this._database.updateItem();
    }
    this.isEditAndAddFalse();
    this.removeTemplate();
  }

  save(node: ModelAllTree): void {
    this.model.ModelIsEdit = false;
    this.nodeClient = node;
    this.editAndAdd.addAndUpdateOrganizationOgrnInventory(this.model, this.connectionId).toPromise().then((model: OrganizationOgrnInventory) => {
      if (model === null) {
        alert("Во время сохранения произошла ошибка! Или пытаетесь добавить дубль!")
        this.cancel(this.nodeClient, this.model.IdOgrn);
      }
    });

  }

  ///Отчет о статистики количества листов документов
  reportStatisticsDocumentInventory() {
    this.editAndAdd.reportStatisticsDocumentInventory();
  }


  //Костыль дожидаемся обновление DOM
  async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
  }

  ///Добавить шаблон в строку это просто жесть
  async addTemplate(index: number): Promise<void> {
    var i = 0;
    await this.delay(10);
    this.templateList = this.fullTemplate.nativeElement.querySelectorAll("mat-form-field[id=template]"); //mat-form-field id="template"
    this.rowList = this.templateTree.nativeElement.querySelectorAll("div[id='" + index + "']");
    for (var row of this.rowList) {
      row.append(this.templateList[i])
      i++;
    }
  }

  removeTemplate(): void {
    var i = 0;
    for (var row of this.rowList) {
      row.removeChild(this.templateList[i]);
      this.fullTemplate.nativeElement.append(this.templateList[i])
      i++;
    }
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
