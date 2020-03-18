import { Component } from '@angular/core';
import { Report, ModelReport } from '../model/modelReport';
import { AuthIdentification } from '../../../../Api/RequestService/requestService';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  templateUrl: '../html/mainChild.html',
  styleUrls: ['../css/mainChild.css'],
  providers:[Report]
})

export class MainChildOtdel{

  constructor(database: Report, public authService: AuthIdentification) {
     this.welcome = 'Добро пожаловать: ' + authService.user.nameField;
     this.rules = authService.user.groupRuleServerField;
     this.selected = this.rules[0];
    this.nestedTreeControl = new NestedTreeControl<ModelReport>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
}

welcome:string = null;
rules:string[] = [];
selected:string = this.rules[0];
nestedTreeControl: NestedTreeControl<ModelReport>;
nestedDataSource: MatTreeNestedDataSource<ModelReport>;

  hasNestedChild = (_: number, nodeData: ModelReport) => !nodeData.types;
  private _getChildren = (node: ModelReport) => node.children;

}
