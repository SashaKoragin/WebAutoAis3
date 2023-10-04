
import { ElementRef } from '@angular/core';
import { SelectAllParameter } from '../ModelSelectView/Model/PostRequest';
import { MatTableDataSource } from '@angular/material/table';

export class AddFile {

  constructor(public select: SelectAllParameter, ref: ElementRef) {
    console.log(ref)
    this.ref = ref;

  }

  ref: ElementRef

  public visible: boolean = false;

  dataSource: MatTableDataSource<Upload> = null;

  //Выгружаем
  public UploadFile: UploadFile = new UploadFile();
  public result: string = null;

  private fileReader = new FileReader();

  public onChange(event: Event) {

    if (event.target['files']) {
      this.readFiles(event.target['files'], 0);
    }
  };

  private readFiles(files: any[], index: number) {
    let file = files[index];
    this.fileReader.onload = () => {
      var doubleFile = this.UploadFile.Upload.findIndex(x => x.NameFile == file.name)
      if (doubleFile == -1) {
        if (file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          this.UploadFile.Upload.push({ IdDocument: 0, NameFile: file.name, MimeFile: file.type, ExpansionFile: file.name.split('.').pop().toLowerCase(), BlobFile: this.uint8ArrayToArray(this.fileReader.result as ArrayBuffer) })
          if (files[index + 1]) {
            this.readFiles(files, index + 1);
          } else {
            index++;
            this.dataSource = new MatTableDataSource<Upload>(this.UploadFile.Upload);
            this.visible = true;
            this.result = "Количество загруженных файлов (" + index + ")"
            this.resetFileStatus();
          }
        } else {
          console.log(file.name + " не соответствует формату application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        }
      }
    };
    this.fileReader.readAsArrayBuffer(file);
  }

  private resetFileStatus() {
    this.ref.nativeElement.value = "";
  }

  ///Конвертация Uint8Array to number[]
  uint8ArrayToArray(uint8Array: ArrayBuffer): number[] {
    var array = [];
    var bytes = new Uint8Array(uint8Array);
    // return bytes;
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      array[i] = bytes[i];
    }
    return array;
  }

  delete(file: Upload) {
    var index = this.UploadFile.Upload.findIndex(x => x.NameFile == file.NameFile)
    if (index !== -1) {
      this.UploadFile.Upload.splice(index, 1);
      if (this.UploadFile.Upload.length == 0) {
        this.dataSource = null;
        this.visible = false;
        this.result = null;
      } else {
        this.dataSource = new MatTableDataSource<Upload>(this.UploadFile.Upload);
      }
    }
  }

  downloadServers(UserGuid: string) {
    if (this.UploadFile.Upload.length > 0) {
      this.UploadFile.ClassFileToServer = UserGuid;
      this.select.addFileModel(this.UploadFile, UserGuid).subscribe(model => {
        console.log(model);
        this.dataSource = null;
        this.UploadFile.Upload = [];
      })
    }
    else {
      alert("Не чего не выбрано нечего выгружать!!!")
    }
  }
}

export class UploadFile {
  Upload: Upload[] = [];
  ClassFileToServer: string;
}

export class Upload {
  IdDocument: number;
  MimeFile: string;
  ExpansionFile: string;
  NameFile: string;
  BlobFile: number[] ;
}
