import { EditAndAddAndDelete } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ModelAllTree, TreeAllModel } from './RecursionModel';
import { ChecklistDatabase } from './ServiceInjectableDataBase';
import { ElementRef } from '@angular/core';
import { ModelValidation } from './ModelValidationTree';
import { GrnInventories } from '../../../../../../Api/RequestService/modelAutomation';
import { BroadcastEventListener } from 'ng2-signalr';
import { deserialize } from 'class-transformer';
import { OrganizationOgrnInventory } from 'src/Api/RequestService/modelAutomation';
export class EditAndAddGrnInventories {

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
  modelCancelError: GrnInventories = new GrnInventories();
  ///Шаблонизация
  model: GrnInventories = new GrnInventories();
  fullTemplate: ElementRef<any>  //Полный шаблон для манипуляции
  templateTree: ElementRef<any>  //Шаблон дерева элементов
  templateList: any //Заложенный шаблон Массив
  rowList: any   //Строка по номеру из Tree Массива
  nodeClient: ModelAllTree
  ///Признаки добавления или редактирования
  isAdd: boolean;
  isEdit: boolean;


  getLevel = (node: ModelAllTree) => node.level;
  /* Get the parent node of a node */
  getParentNode(node: ModelAllTree): ModelAllTree | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  public subscribeServers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<GrnInventories>('SubscribeGrnInventory');
    this.signalR.connect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var subModel = deserialize<GrnInventories>(GrnInventories, substring);
      this.index = 0;
      if (this.isEdit) {
        if (this.model.IdDocGrn !== subModel.IdDocGrn) {
          this.cancel(this.nodeClient);
        }
        else {
          this.isEditAndAddFalse();
          this.removeTemplate();
          this.model.ModelIsEdit = false;
          this.modelCancelError.ModelIsEdit = false;
        }
      }
      var modelFind = this._database.data.find(x => x.OrganizationOgrnInventory.IdOgrn === subModel.IdOgrn).TreeAllModel.find(xx => xx.GrnInventories.IdDocGrn === subModel.IdDocGrn);
      var indexZero = this._database.data.find(x => x.OrganizationOgrnInventory.IdOgrn === subModel.IdOgrn).TreeAllModel.find(xx => xx.GrnInventories.IdDocGrn === 0);
      try {
        ///Добавление модели если
        if (indexZero) {
          this.model.ModelIsEdit = false;
          const parentNode = this.flatNodeMap.get(this.nodeClient);
          parentNode.GrnInventories = JSON.parse(JSON.stringify(subModel));
          ///Для изменявшего
        }
        else {
          ///Найденная модель
          if (modelFind) {
            modelFind.GrnInventories = JSON.parse(JSON.stringify(subModel));
          }
          else {
            ///Для остальных пользователей добавление
            var treeModel = new TreeAllModel();
            treeModel.GrnInventories = JSON.parse(JSON.stringify(subModel));
            treeModel.TreeAllModel = null;
            treeModel.OrganizationOgrnInventory = null;
            treeModel.DocumentInventories = [];
            treeModel.UserLoginModel = this.loginUser;
            this._database.insertItem(treeModel!, true);

          }
        }
        this._database.updateItem();
      }
      catch (e) {
        console.log(e);
      }
    });
  }


  public addRootChild(node: ModelAllTree, organizationOgrnInventory: OrganizationOgrnInventory) {
    if (node.model.UserLoginModel === this.loginUser) {
      if (this.isEdit) {
        alert("Завершите предыдущее редактирование!")
        return;
      }

      const parentNode = this.flatNodeMap.get(node);

      var grnTreeModel = new TreeAllModel();
      this.model = this.newModel(organizationOgrnInventory.IdOgrn);
      this.modelCancelError = JSON.parse(JSON.stringify(this.model));
      grnTreeModel.OrganizationOgrnInventory = null;
      grnTreeModel.GrnInventories = this.model;
      grnTreeModel.DocumentInventories = [];
      grnTreeModel.UserLoginModel = this.loginUser;
      grnTreeModel.TreeAllModel = null;
      parentNode!.TreeAllModel.push(grnTreeModel)
      this._database.updateItem();
      this.isEditAndAddTrue();
      this.addTemplate(this.model.IdDocGrn)
      this.treeControl.expand(node);

    }
    else {
      alert("Добавление ГРН в чужой ОГРН запрещено!!!")
    }

  }

  delete(node: ModelAllTree, model: GrnInventories): void {
    alert('Не надо так делать!');
  }

  edit(node: ModelAllTree, model: GrnInventories): void {
    if (node.model.UserLoginModel === this.loginUser) {
      this.nodeClient = node;
      model.ModelIsEdit = true
      this.model.ModelIsEdit = true;
      this.modelCancelError = JSON.parse(JSON.stringify(model));
      this.model = JSON.parse(JSON.stringify(model));
      this.isEditAndAddTrue();
      this.addTemplate(this.model.IdDocGrn)
    }
    else {
      alert("Нельзя редактировать ГРН чужого пользователя!!!")
    }
  }

  newModel(idDocument: number): GrnInventories {
    var newModel: GrnInventories = new GrnInventories()
    newModel.ModelIsEdit = true;
    newModel.IdDocGrn = 0;
    newModel.NameDocument = "Дело ГРН"
    newModel.IdOgrn = idDocument;
    return newModel;
  }

  cancel(node: ModelAllTree): void {
    this.modelCancelError.ModelIsEdit = false;
    if (this.modelCancelError.IdDocGrn === 0) {
      const parentNode = this.getParentNode(node)
      const parentFlag = this.flatNodeMap.get(parentNode);
      this._database.deleteItem(parentFlag!, this.modelCancelError.IdDocGrn)
    }
    else {
      const parentNode = this.flatNodeMap.get(node);
      parentNode.GrnInventories = JSON.parse(JSON.stringify(this.modelCancelError));
    }
    this._database.updateItem();
    this.isEditAndAddFalse();
    this.removeTemplate();
  }

  save(node: ModelAllTree): void {
    this.model.ModelIsEdit = false;
    this.nodeClient = node;
    this.editAndAdd.addAndUpdateGrnInventory(this.model, this.connectionId).toPromise().then((model: GrnInventories) => {
      if (model === null) {
        alert("Во время сохранения произошла ошибка! Или пытаетесь добавить дубль!")
        this.cancel(this.nodeClient);
      }
    });

  }
  ///Проставить статус Готов к отработки процесса
  isCheckProcess(node: ModelAllTree, model: GrnInventories) {
    if (node.model.UserLoginModel === this.loginUser) {
      this.nodeClient = node;
      this.modelCancelError = JSON.parse(JSON.stringify(model));
      this.model = JSON.parse(JSON.stringify(model));
      model.IsStartProcess = true;
      this.editAndAdd.addAndUpdateGrnInventory(model, this.connectionId).toPromise().then((model: GrnInventories) => {
        if (model === null) {
          alert("Во время сохранения произошла ошибка!")
          this.cancel(this.nodeClient);
        }
      });
    }
    else {
      alert("Нельзя проставить статус Готово чужим ГРН!!!")
    }

  }

  ///Генерация Штрих-кода
  createBarcode(grnInventory: GrnInventories) {
    if (grnInventory.StatusFinish) {
      this.editAndAdd.createBarcode(grnInventory);
    }
    else {
      alert("Процесс по ГРН не закончен! Формирование Штрих-кодов невозможно!")
    }
  }

  ///Генерация отчета синхронизации
  createReportSynchronization(grnInventory: GrnInventories) {
    this.editAndAdd.createReportSynchronization(grnInventory);
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
    this.rowList = this.templateTree.nativeElement.querySelectorAll("div[class='" + index + "']");
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
