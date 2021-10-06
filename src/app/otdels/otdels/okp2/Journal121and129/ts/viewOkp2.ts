import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';
import { PublicFunction } from '../../../../../../Api/PublicFunction/PublicFunction';


@Component({
  templateUrl: '../html/viewOkp2.html',
  styleUrls: ['../css/viewOkp2.css'],
  providers: [SelectAllParametrs]
})

export class ModelOkp2 implements OnInit {
  constructor(public select: SelectAllParametrs) { }


  public valueProgress: number = 0;
  public IsVisible: boolean = false;
  public statusText: string = null;
  public publicFunction: PublicFunction = new PublicFunction();
  public serverresult: string = null;
  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columns[this.dinamicmodel.mainselect.indexcolumnmodel];
  ngOnInit(): void {
    this.errorserver(null)
  }

  errorserver(type: any) {
    this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselect.indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columns[this.dinamicmodel.mainselect.indexcolumnmodel]
    })
  }

  async donloadAllFile() {
    this.startDonload();
    var modelServer = JSON.parse(JSON.stringify(this.columns.Model.filteredData));
   // console.log(row);
    var progress = 1 / this.columns.Model.data.length * 100;
    for (var row of modelServer) {
      if (row.Extensions) {
        var blob = await this.select.donloadFile(row.Id, this.columns.Type);
        if (blob) {
          var nameFile = `${row.RegNumDeclaration}_${row.Inn}_${row.TypeDocument}_${row.Extensions}`;;
          var url = window.URL.createObjectURL(blob);
          this.statusText = `Загрузка файла ${nameFile}`;
          var a = document.createElement('a');
          a.href = url;
          a.download = nameFile;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
        else {
          alert('Отсутствует маршрут url для файла!')
        }
      }
      else {
        this.statusText = 'Отсутствует файл для выгрузки!';
      }
      this.valueProgress = progress + this.valueProgress
    };
    this.finishDonload();
  }

  startDonload() {
    this.serverresult = "Количество файлов в выборке" + this.columns.Model.data.length
    this.IsVisible = true;
    this.statusText = "Начало загрузки ждите!!!"
  }

  finishDonload() {
    this.serverresult = null;
    this.IsVisible = false;
    this.valueProgress = 0;
    this.statusText = null;
  }


  async donloadFile(row: any) {
    if (row.Extensions) {
      var blob = await this.select.donloadFile(row.Id, this.columns.Type);
    //  console.log(row);
      if (blob) {
        var nameFile = `${row.RegNumDeclaration}_${row.Inn}_${row.TypeDocument}_${row.Extensions}`;
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = nameFile;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
      else {
        alert('Отсутствует маршрут url для файла!')
      }
    }
    else {
      alert('Отсутствует файл для выгрузки!');
    }
  }
}















