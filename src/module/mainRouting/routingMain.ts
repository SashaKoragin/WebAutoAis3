import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthInventar } from '../../app/security/model/securityModel';
import { ChildNgAutoModule } from '../childMain/childNgModule';


const appRoutes: Routes = [
  {
      path: 'Auto',
      loadChildren: ()=> ChildNgAutoModule,
      canLoad: [AuthInventar],
  }


];

@NgModule({
  imports: [
      RouterModule.forRoot(
          appRoutes,
          {
              enableTracing: false // <-- debugging purposes only
          }
      )
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
