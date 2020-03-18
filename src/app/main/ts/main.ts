import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '../html/main.html',
  styleUrls: ['../css/main.css']
})
export class MainComponent {

function(n:number):boolean{
  if(n>1){
    return true;
  }
 return false;
}

}
