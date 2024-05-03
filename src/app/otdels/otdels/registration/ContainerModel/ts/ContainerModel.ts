import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { EditAndAddAndDelete, SelectAndEditDataBase } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { MatSort } from '@angular/material/sort';
import { ImportToExcel } from '../../../../../../Api/ModelSelectView/Model/exportXlsx';
import { DocumentContainerTable } from '../../../../../../Api/EditAndAddDataBase/editAndAddDataBAse';

@Component({
  templateUrl: '../html/ContainerModel.html',
  styleUrls: ['../css/ContainerModel.css'],
  providers: [SelectAndEditDataBase, EditAndAddAndDelete]
})
export class ContainerModel implements OnInit {
  constructor(public select: SelectAndEditDataBase, public editAndAdd: EditAndAddAndDelete, public signalR: AuthIdentificationSignalR) { }



  @ViewChild('documentContainer', { static: true }) paginatorDocumentContainer: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortDocumentContainer: MatSort;
  @ViewChild('TABLEDOCUMENTCONTAINER', { static: false }) tableDocumentContainer: ElementRef;
  @ViewChild('TEMPLATEDOCUMENTCONTAINER', { static: false }) templateDocumentContainer: ElementRef;

  ngOnInit(): void {
    this.loadsModel();
  }


  async loadsModel() {
    await this.select.allDocumentContainer();
    await this.documentContainerTableJournal.addtableModel(this.select.select, this.paginatorDocumentContainer, this.sortDocumentContainer, this.tableDocumentContainer, this.templateDocumentContainer)
  }


  excel: ImportToExcel = new ImportToExcel();
  public documentContainerTableJournal = new DocumentContainerTable(this.editAndAdd, this.signalR);

  async updateDataBase() {
    await this.loadsModel();
  }

}
