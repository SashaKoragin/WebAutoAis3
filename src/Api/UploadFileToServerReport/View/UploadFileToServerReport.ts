import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SelectAllParameter } from '../../ModelSelectView/Model/PostRequest';
import { AddFile } from '../../ModelTable/FileModel';

@Component(({
  selector: 'uploadFile',
  templateUrl: '../Html/UploadFileToServerReport.html',
  styleUrls: ['../Html/UploadFileToServerReport.css'],
  providers: [SelectAllParameter]
}) as any)


export class UploadFileToServerReport implements AfterViewInit {

  constructor(public select: SelectAllParameter) { }

  @ViewChild('myInput', { static: false, read: ElementRef }) ref: ElementRef;

  displayDataSource: string[] = ['Name', 'Expansion', 'Button'];
  addFile: AddFile
  @Input() UserGuid: string;  ///Для разбора на сервере классификация файла


  ngAfterViewInit() {

    this.addFile = new AddFile(this.select, this.ref);
  }

}
