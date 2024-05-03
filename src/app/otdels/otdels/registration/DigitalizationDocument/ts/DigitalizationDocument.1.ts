import { EditAndAddAndDelete, SelectAndEditDataBase } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { ChecklistDatabase } from './ServiceInjectableDataBase';
import { ModelAllTree, TreeAllModel } from './RecursionModel';
import { EditAndAddOrganizationOgrnInventory } from './EditAndAddToDataBase';
import { EditAndAddGrnInventories } from './EditAndAddGrnInventories';
import { EditAndAddDocumentInventory } from './EditAndAddDocumentInventory';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ImportToExcel } from '../../../../../../Api/ModelSelectView/Model/exportXlsx';
import { EventProcessErrorTable } from '../../../../../../Api/EditAndAddDataBase/editAndAddDataBAse';
import { MatTableDataSource } from '@angular/material/table';
import { AisGrnEventErrorModel } from '../../../../../../Api/RequestService/modelAutomation';
import { FilterModel } from './FilterModelInventoryOgrn';



@Component({
  templateUrl: '../html/DigitalizationDocument.html',
  styleUrls: ['../css/DigitalizationDocument.css'],
  providers: [SelectAndEditDataBase, EditAndAddAndDelete, ChecklistDatabase]
})
export class DigitalizationDocument implements OnInit {
  constructor(public select: SelectAndEditDataBase, public editAndAdd: EditAndAddAndDelete, public signalR: AuthIdentificationSignalR, private _database: ChecklistDatabase) { }




  async updateDataBase() {
    await this.filterModel.selectFilterToDataBase();
    await this.loadsModel();
  }

  async ngOnInit(): Promise<void> {
    this.progress = true;
    await this.filterModel.selectFilter();
    this.loadsModel();
  }

  progress: boolean = true;

  public eventProcessTableJournal = new EventProcessErrorTable(this.editAndAdd, this.signalR);
  excel: ImportToExcel = new ImportToExcel();
  @ViewChild('TEMPLATEVENTERRORS', { static: true }) templateEventError: ElementRef;
  @ViewChild('paginatorEventErrors', { static: true }) paginatorEventError: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortEventError: MatSort;
  @ViewChild('TABLEEVENTERRORS', { static: false }) tableEventError: ElementRef;


  selectionRowGrnAis3 = new SelectionModel<any>(false, []);

  isLoadDetailingEventError: boolean = true;
  @ViewChild('TABLEDETAILINGEVENTERROR', { static: false }) tableDetailingEventErrors: ElementRef;
  @ViewChild('detailingEventError', { static: true }) paginatorDetailingEventError: MatPaginator;

  public displayedColumnsDetailingEventError = ['IdGrnAis3', 'NumberOgrnGrn', 'FullNameGrnAis3'];
  public dataSourceDetailingEventError: MatTableDataSource<AisGrnEventErrorModel> = new MatTableDataSource<AisGrnEventErrorModel>();



  async isSelectGrnAis3() {
    if (this.selectionRowGrnAis3.selected.length === 1) {
      await this.select.allDetailingEventError(this.selectionRowGrnAis3.selected[0].IdProcess)
      this.dataSourceDetailingEventError.paginator = this.paginatorDetailingEventError;
      this.dataSourceDetailingEventError.data = this.select.select.AisGrnEventErrorModel;
      this.isLoadDetailingEventError = false;
    }
    else {
      this.isLoadDetailingEventError = true;
      this.dataSourceDetailingEventError.data = [];
    }
  }

  //Процедура присваивание процессу статуса готово в случае жонглирования ГРН
  async setStatusReadyProcess(idProcess: number) {
    await this.select.setStatusReadyProcess(idProcess);
    await this.loadsModel();
  }

  public filterModel: FilterModel = new FilterModel(this.select, this.signalR)


  async loadsModel() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    await this._database.initialize(this.filterModel.filterToServer);
    this._database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
    this.editAndAddOrganizationOgrnInventory.initialize(this.templateOrganizationOgrnInventory, this.templateTreeModel, this.signalR.autorization?.user.loginField, this.signalR.iduser);
    this.editAndAddGrnInventories.initialize(this.templateGrnInventories, this.templateTreeModel, this.signalR.autorization?.user.loginField, this.signalR.iduser);
    this.editAndAddDocumentInventory.initialize(this.templateDocuments, this.templateTreeModel, this.select.select.DirectoryDocument, this.select.select.InfoDocument, this.signalR.autorization?.user.loginField, this.signalR.iduser);
    await this.eventProcessTableJournal.addtableModel(this.select.select, this.paginatorEventError, this.sortEventError, this.tableEventError, this.templateEventError)
    this.progress = false;
  }







  //Шаблон дерева элементов
  @ViewChild('TEMPLATETREEMODEL', { read: ElementRef, static: false }) templateTreeModel: ElementRef;

  //Шаблоны ОГРН
  @ViewChild('TemplateOgrn', { read: ElementRef, static: false }) templateOrganizationOgrnInventory: ElementRef;

  //Шаблоны ГРН Внутренний номер
  @ViewChild('TemplateGgrn', { read: ElementRef, static: false }) templateGrnInventories: ElementRef;

  //Шаблон для редактирования документов в ГРН
  @ViewChild('TemplateDocument', { read: ElementRef, static: false }) templateDocuments: ElementRef;

  //Форма фильтра документов
  @ViewChild('formDocumentInventory', { read: ElementRef, static: false }) formDocumentInventory: ElementRef;

  //Форма фильтра атрибутов
  @ViewChild('formInfo', { read: ElementRef, static: false }) formInfo: ElementRef;



  buildString: string | null = null;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ModelAllTree, TreeAllModel>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeAllModel, ModelAllTree>();

  /** A selected parent node to be inserted */
  selectedParent: ModelAllTree | null = null;

  /** The new item's name */
  newItemName = '';



  treeFlattener: MatTreeFlattener<TreeAllModel, ModelAllTree>;

  dataSource: MatTreeFlatDataSource<TreeAllModel, ModelAllTree>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ModelAllTree>(true /* multiple */);

  getLevel = (node: ModelAllTree) => node.level;

  isExpandable = (node: ModelAllTree) => node.expandable;

  getChildren = (node: TreeAllModel): TreeAllModel[] => node.TreeAllModel;

  hasChild = (_: number, _nodeData: ModelAllTree) => _nodeData.model.TreeAllModel.length > 0;

  treeControl: FlatTreeControl<ModelAllTree> = new FlatTreeControl<ModelAllTree>(this.getLevel, this.isExpandable);;

  public editAndAddOrganizationOgrnInventory = new EditAndAddOrganizationOgrnInventory(this.editAndAdd, this.signalR, this._database, this.treeControl, this.flatNodeMap)

  public editAndAddGrnInventories = new EditAndAddGrnInventories(this.editAndAdd, this.signalR, this._database, this.treeControl, this.flatNodeMap)

  public editAndAddDocumentInventory = new EditAndAddDocumentInventory(this.editAndAdd, this.signalR, this._database, this.treeControl, this.flatNodeMap)

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TreeAllModel, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.model === node ? existingNode : new ModelAllTree();
    flatNode.model = node;
    flatNode.level = level;
    flatNode.expandable = !!node.TreeAllModel?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };


  filterRecursive(filterText: string,
    array: any[],
    property: string,
    property1: string
    //,
    //
    // property2: string,
    // property3: string,
    // property4: string
  ) {
    let filteredData;
    function copy(o: any) {
      return Object.assign({}, o);
    }
    if (filterText) {
      filterText = filterText.toLowerCase();
      filteredData = array.map(copy).filter(function x(y) {
        console.log(y);
        if (y.OrganizationOgrnInventory !== null) {
          if (y.OrganizationOgrnInventory[property]) {
            if (y.OrganizationOgrnInventory[property] != null) {
              if (y.OrganizationOgrnInventory[property].toString().toLowerCase().includes(filterText)) {
                return true;
              }
            }
          }
        }

        if (y.GrnInventories !== null) {
          if (y.GrnInventories[property1]) {
            if (y.GrnInventories[property1] !== null) {
              if (y.GrnInventories[property1].toString().toLowerCase().includes(filterText)) {
                return true;
              }
            }
          }
          if (y.GrnInventories.GrnInventories) {
            return (y.GrnInventories = y.GrnInventories.map(copy).filter(x)).length;
          }

          if (y.TreeAllModel) {
            y.TreeAllModel[y.GrnInventories] = y.GrnInventories;
            if (y.GrnInventories.length < 0) {
              y.TreeAllModel = [];
            }
            return y.TreeAllModel;
          }
        }
        // if (y[property1] != null) {
        //   if (y[property1].toString().toLowerCase().includes(filterText)) {
        //     return true;
        //   }
        // }
        // if (y.DocumentInventories !== null) {
        //   if (y.DocumentInventories.length > 0) {
        //     y.DocumentInventories = y.DocumentInventories.map(copy).filter(function x(model) {
        //       if (model[property2] != null) {
        //         if (model[property2].toString().toLowerCase().includes(filterText)) {
        //           return true;
        //         }
        //       }
        //       if (model[property3] != null) {
        //         if (model[property3].toString().toLowerCase().includes(filterText)) {
        //           return true;
        //         }
        //       }
        //       if (model[property4]) {
        //         if (model[property4] !== null) {
        //           if (model[property4].toString().toLowerCase().includes(filterText)) {
        //             return true;
        //           }
        //         }
        //       }
        //       if (model.DocumentInventories) {
        //         return (model.DocumentInventories = model.DocumentInventories.map(copy).filter(x)).length;
        //       }
        //     });
        //     if (y.TreeAllModel) {
        //       y.TreeAllModel[y.DocumentInventories] = y.DocumentInventories;
        //       if (y.DocumentInventories.length < 0) {
        //         y.TreeAllModel = [];
        //       }
        //       return y.TreeAllModel;
        //     }
        //   }
        // }
        if (y.TreeAllModel) {
          // (y.TreeAllModel = y.TreeAllModel.map(copy).filter(x)).length
          return (y.TreeAllModel = y.TreeAllModel.map(copy).filter(x)).length;
        }
      });
    } else {
      filteredData = array;
    }
    return filteredData;
  }

  public filterTree(filterValue: string): void {
    this.dataSource.data = this.filterRecursive(
      filterValue,
      this._database.modelUserAndEquipment.TreeAllModel,
      'NumberOgrn',
      'NumberOgrnGrn'
      // ,
      // 'NameDocument',
      // 'NameDocument',
      // 'CountPage',
      // 'GuidDocument'
    );
  }

  applyFilter(filterText: string) {
    this.filterTree(filterText);
  }




}
