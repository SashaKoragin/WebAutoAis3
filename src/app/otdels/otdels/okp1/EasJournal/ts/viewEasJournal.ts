import { OnInit, Component } from "@angular/core";
import { SelectAllParameter } from '../../../../../../Api/ModelSelectView/Model/PostRequest';
import { DynamicTableColumnModel, Table } from '../../../../../../Api/ModelSelectView/Model/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../../../../Api/ModelSelectView/Model/GenerateParametrFront';
import { ModelSelect } from '../../../../../../Api/ModelSelectView/Model/ParametrModel';

@Component({
  templateUrl: '../html/viewEasJournal.html',
  styleUrls: ['../css/viewEasJournal.css'],
  providers: [SelectAllParameter]
})
export class EasJournal implements OnInit {
  constructor(public select: SelectAllParameter) { }

  dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
  logica: LogicaDataBase = new LogicaDataBase();
  selecting: GenerateParametrs;

  columns: Table = this.dinamicmodel.columnsOkp1[1];

  ngOnInit(): void {
    this.selectTaxJournalEas(null)
  }

  selectTaxJournalEas(type: any) {
    this.select.addSelectAllParameter(new ModelSelect(31)).subscribe((model: ModelSelect) => {
      this.selecting = new GenerateParametrs(model);
      this.columns = this.dinamicmodel.columnsOkp1[1]
    })
  }

 async downloadFile(row: any) {
    var blob = await this.select.downloadFile(row.Id, this.columns.Type);
    if (blob) {
      var nameFile = `${row.RegNumber}_${row.Inn}.pdf`;
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

}
