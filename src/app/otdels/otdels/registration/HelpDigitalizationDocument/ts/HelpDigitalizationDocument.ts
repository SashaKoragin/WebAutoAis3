import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EditAndAddAndDelete, SelectAndEditDataBase } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';
import { InfoDocumentTable } from '../../../../../../Api/EditAndAddDataBase/editAndAddDataBAse';
import { ImportToExcel } from '../../../../../../Api/ModelSelectView/Model/exportXlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  templateUrl: '../html/HelpDigitalizationDocument.html',
  styleUrls: ['../css/HelpDigitalizationDocument.css'],
  providers: [SelectAndEditDataBase, EditAndAddAndDelete]
})

export class HelpDigitalizationDocument implements OnInit {
  constructor(public select: SelectAndEditDataBase, public editAndAdd: EditAndAddAndDelete, public signalR: AuthIdentificationSignalR) { }


  @ViewChild('TEMPLATEINFODOCUMENT', { static: true }) templateInfoDocument: ElementRef;
  @ViewChild('infoDocument', { static: true }) paginatorInfoDocument: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortInfoDocument: MatSort;
  @ViewChild('TABLEINFODOCUMENT', { static: false }) tableInfoDocument: ElementRef;


  isload: boolean = true;
  loadMessage: string[] = []
  excel: ImportToExcel = new ImportToExcel();

  public infoDocumentTableJournal = new InfoDocumentTable(this.editAndAdd, this.signalR);

  ngOnInit(): void {
    this.start();
  }

  async start() {
    var message = null;
    await this.select.allInfoDocument();
    message = await this.infoDocumentTableJournal.addtableModel(this.select.select, this.paginatorInfoDocument, this.sortInfoDocument, this.tableInfoDocument, this.templateInfoDocument)
    this.loadMessage.push(message);
    this.isload = false;
  }

}
