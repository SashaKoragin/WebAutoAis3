import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectAndEditDataBase, EditAndAddAndDelete } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { TokenTableModel } from '../../../../../../Api/EditAndAddDataBase/editAndAddDataBAse';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ImportToExcel } from '../../../../../../Api/ModelSelectView/Model/exportXlsx';
import { AuthIdentificationSignalR } from '../../../../../../Api/RequestService/requestService';

@Component({
  templateUrl: '../html/signatureOkp2.html',
  styleUrls: ['../css/signatureOkp2.css'],
  providers: [SelectAndEditDataBase, EditAndAddAndDelete]
})

export class SignatureOkp2 implements OnInit {
  constructor(public select: SelectAndEditDataBase,
    public editandadd: EditAndAddAndDelete, public signalR: AuthIdentificationSignalR) { }


  @ViewChild('TEMPLATESENDER', { static: true }) templateSender: ElementRef;
  @ViewChild('senders', { static: true }) paginatorSender: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortSender: MatSort;
  @ViewChild('TABLESENDER', { static: false }) tableSender: ElementRef;

  isload: boolean = true;
  loadMessage: string[] = []
  excel: ImportToExcel = new ImportToExcel();




  public senderTableTaxJournal = new TokenTableModel(this.editandadd, this.signalR);

  ngOnInit(): void {
    this.start();
  }

  async start() {
    var message = null;
    await this.select.SenderDepartment();
    console.log(this.select.select.DepartamentOtdel)
    message = await this.senderTableTaxJournal.addtableModel(this.select.select, this.paginatorSender, this.sortSender, this.tableSender, this.templateSender)
    this.loadMessage.push(message);
    this.isload = false;
  }
}
