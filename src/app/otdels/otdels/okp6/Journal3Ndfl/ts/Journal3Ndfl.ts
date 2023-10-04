import { OnInit, Component } from '@angular/core';
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';


@Component({
  templateUrl: '../html/Journal3Ndfl.html',
  styleUrls: ['../css/Journal3Ndfl.css'],
  providers: [SelectAllParameter]
})
export class Journal3Ndfl implements OnInit {
  constructor(public select: SelectAllParameter) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOkp6[2];


  ngOnInit(): void {
    this.delivery(null)
  }

  delivery(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(this.dinamicmodel.selectServerOkp6[2].indexsevr)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOkp6[2]
    })
  }


  generateXlsxDoc() {
    var reportSql = this.selecting.generatecommand();
    reportSql.selectInfoField = this.dinamicmodel.selectServerOkp6[2].text;
    this.select.generateXlsxServer(reportSql, reportSql.selectInfoField);
  }

  async downloadFile(row: any) {
    if (row.Extensions) {
      var blob = await this.select.downloadFile(row.Id, this.columns.Type);
      //  console.log(row);
      if (blob) {
        var nameFile = `${row.RegNumDecl}_${row.NameNp}_${row.TypeDocument}`;
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
