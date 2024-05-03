import { ModelAllTree, TreeAllModel } from './RecursionModel';
import { ChecklistDatabase } from './ServiceInjectableDataBase';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { EditAndAddAndDelete } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DocumentInventories, DirectoryDocument, StatusDocument, InfoDocument } from '../../../../../../Api/RequestService/modelAutomation';
import { ModelValidation } from './ModelValidationTree';
import { ElementRef } from '@angular/core';
import { BroadcastEventListener } from 'ng2-signalr';
import { deserialize } from 'class-transformer';
import { DeleteDocumentInventory } from '../../../../../../Api/RequestService/modelMessageServer';

export class EditAndAddDocumentInventory {
  constructor(public editAndAdd: EditAndAddAndDelete,
    public signalR: AuthIdentificationSignalR,
    private _database: ChecklistDatabase,
    private treeControl: FlatTreeControl<ModelAllTree>,
    private flatNodeMap: Map<ModelAllTree, TreeAllModel>) {
    this.subscribeServers();
  }


  public async initialize(template: ElementRef, templateTree: ElementRef, documentInventories: DirectoryDocument[], infoDocument: InfoDocument[], userLogin: string, connectionId: string) {
    this.templateTree = templateTree;
    this.fullTemplate = template;
    this.directoryDocument = documentInventories;
    this.filteredDirectoryDocument = this.directoryDocument.slice();
    this.infoDocument = infoDocument;
    this.filteredInfoDocument = this.infoDocument.slice();
    this.loginUser = userLogin;
    this.connectionId = connectionId;
  }

  public connectionId: string;
  public loginUser: string;
  public modelValid: ModelValidation = new ModelValidation()

  public directoryDocument: DirectoryDocument[];
  public infoDocument: InfoDocument[];

  public filteredDirectoryDocument: any;
  public filteredInfoDocument: any;

  public callbackFiltersAll(event: any): void {

    this.filteredDirectoryDocument = this.directoryDocument.slice();
    this.filteredInfoDocument = this.infoDocument.slice();
    event.input.nativeElement.value = '';
    event.input.nativeElement.focus();
  }

  //Индекс клиента
  index: number;
  //Подписка
  public subscribeAddAndUpdate: any = null;

  //В случае отмены редактирования
  modelCancelError: DocumentInventories = new DocumentInventories();
  ///Шаблонизация
  model: DocumentInventories = new DocumentInventories();
  fullTemplate: ElementRef<any>  //Полный шаблон для манипуляции
  templateTree: ElementRef<any>  //Шаблон дерева элементов
  templateList: any //Заложенный шаблон Массив
  rowList: any   //Строка по номеру из Tree Массива
  nodeClient: ModelAllTree
  ///Признаки добавления или редактирования
  isAdd: boolean;
  isEdit: boolean;

  public subscribeServers() {
    this.subscribeAddAndUpdate = new BroadcastEventListener<DocumentInventories>('SubscribeDocumentInventory');
    this.signalR.connect.listen(this.subscribeAddAndUpdate);
    this.subscribeAddAndUpdate.subscribe((substring: string) => {
      var subModel = deserialize<DocumentInventories>(DocumentInventories, substring);
      console.log(subModel);
      this.index = 0;
      if (this.isEdit) {
        if (this.model.IdDocument !== subModel.IdDocument) {
          this.cancel(this.nodeClient);
        }
        else {
          this.isEditAndAddFalse();
          this.removeTemplate();
          this.model.ModelIsEdit = false;
          this.modelCancelError.ModelIsEdit = false;
        }
      }
      var modelFindGrn = this._database.findLevelModel(subModel.IdDocGrn);
      var modelFind = modelFindGrn.DocumentInventories.find(x => x.IdDocument === subModel.IdDocument);
      var indexZero = modelFindGrn.DocumentInventories.find(x => x.IdDocument === 0);

      try {
        ///Добавление модели если
        if (indexZero) {
          this.model.ModelIsEdit = false;
          const parentNode = this.flatNodeMap.get(this.nodeClient);
          parentNode.DocumentInventories[parentNode.DocumentInventories.indexOf(this.model)] = JSON.parse(JSON.stringify(subModel));
          ///Для изменявшего
        }
        else {
          ///Найденная модель
          if (modelFind) {
            modelFindGrn.DocumentInventories[modelFindGrn.DocumentInventories.indexOf(modelFind)] = JSON.parse(JSON.stringify(subModel));
          }
          else {
            ///Для остальных пользователей добавление
            modelFindGrn.DocumentInventories.push(JSON.parse(JSON.stringify(subModel)));
          }
        }
        this._database.updateItem();
      }
      catch (e) {
        console.log(e);
      }
    });
  }


  public addChildGrnDocument(node: ModelAllTree, idDocumentGrn: number, statusFinish: boolean) {
    if (node.model.UserLoginModel === this.loginUser) {
      if (this.isEdit || idDocumentGrn === 0) {
        alert("Завершите предыдущее редактирование!")
        return;
      }
      this.model = this.newModel(idDocumentGrn);
      this.modelCancelError = JSON.parse(JSON.stringify(this.model));
      node.model.DocumentInventories.push(this.model);
      this._database.updateItem();
      this.treeControl.expand(node);
      this.addTemplate(this.model.IdDocument)
      this.isEditAndAddTrue();
    }
    else {
      alert("Нельзя добавлять документ в чужой ГРН!!!")
    }
  }

  ///Удаление документа со статусами 1 и 5
  delete(node: ModelAllTree, model: DocumentInventories): void {
    if (node.model.UserLoginModel === this.loginUser) {
      this.editAndAdd.deleteDocumentInventory(model).toPromise().then((modelMessage: DeleteDocumentInventory) => {
        if (modelMessage.codeStatusField === 0) {
          node.model.DocumentInventories = node.model.DocumentInventories.filter(x => x.IdDocument != model.IdDocument);
          this._database.updateItem();
          alert(modelMessage.messageProcessField)
        }
        else {
          alert(modelMessage.messageProcessField)
        }
      });
    }
    else {
      alert("Нельзя удалять чужой документ!!!")
    }
  }


  edit(node: ModelAllTree, model: DocumentInventories): void {
    if (node.model.UserLoginModel === this.loginUser) {
      if (model.IdStatusDocument === 4 || model.IdStatusDocument === 3) {
        alert("Нельзя редактировать - (Документ укомплектован в тару) или (Документ отработан и готов для Тары)!!!");
        return;
      }
      else {
        this.nodeClient = node;
        model.ModelIsEdit = true;
        this.model.ModelIsEdit = true;
        this.modelCancelError = JSON.parse(JSON.stringify(model));
        this.model = JSON.parse(JSON.stringify(model));
        this.isEditAndAddTrue();
        this.addTemplate(this.model.IdDocument);
      }
    }
    else {
      alert("Нельзя редактировать чужой документ!!!")
    }

  }

  isReturnDocument(node: ModelAllTree, model: DocumentInventories): void {
    if (node.model.UserLoginModel === this.loginUser) {
      if (model.IdStatusDocument === 4 || model.IdStatusDocument === 1 || model.IdStatusDocument === 5) {
        alert("Нельзя откатить документ - (Документ укомплектован в тару)!!!");
        return;
      }
      else {
        this.nodeClient = node;
        var statusNew = new StatusDocument();
        statusNew.IdStatusDocument = 2;
        statusNew.NameMessage = 'Документы будут обработаны повторно'
        model.IdStatusDocument = 2;
        model.StatusDocument = statusNew;
        this.modelCancelError = JSON.parse(JSON.stringify(model));
        this.model = JSON.parse(JSON.stringify(model));
        this.save(node);
      }
    }
    else {
      alert("Нельзя отправлять на повторное Ретросканирование чужой документ!!!")
    }
  }

  cancel(node: ModelAllTree): void {
    this.modelCancelError.ModelIsEdit = false;
    if (this.modelCancelError.IdDocument === 0) {
      node.model.DocumentInventories.pop()
    }
    else {
      var index = node.model.DocumentInventories.find(x => x.IdDocument === this.modelCancelError.IdDocument)
      node.model.DocumentInventories[node.model.DocumentInventories.indexOf(index)] = JSON.parse(JSON.stringify(this.modelCancelError));
    }
    this._database.updateItem();
    this.isEditAndAddFalse();
    this.removeTemplate();
  }

  save(node: ModelAllTree): void {
    this.model.ModelIsEdit = false;
    this.nodeClient = node;
    this.model.DirectoryDocument ? this.model.IdDocumentDirectory = this.model.DirectoryDocument.IdDocumentDirectory : this.model.DirectoryDocument = null;
    this.model.InfoDocument ? this.model.IdInfo = this.model.InfoDocument.IdInfo : this.model.InfoDocument = null;
    this.editAndAdd.addAndEditDocumentInventory(this.model, this.connectionId).toPromise().then((model: DocumentInventories) => {
      if (model === null) {
        alert("Во время сохранения произошла ошибка!")
        this.cancel(this.nodeClient);
      }
    });
  }


  newModel(idDocument: number): DocumentInventories {
    var newModel: DocumentInventories = new DocumentInventories()
    var statusNew = new StatusDocument();
    statusNew.IdStatusDocument = 1;
    statusNew.NameMessage = 'Документ готов к обработке'
    newModel.IdDocument = 0;
    newModel.IdDocGrn = idDocument;
    newModel.IdStatusDocument = 1;
    newModel.ModelIsEdit = true;
    newModel.StatusDocument = statusNew;
    return newModel;
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
    this.rowList = this.templateTree.nativeElement.querySelectorAll("div[tabIndex='" + index + "']");
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
