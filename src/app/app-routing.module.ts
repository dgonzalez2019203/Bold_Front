import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PrincipalViewComponent } from './components/general/principal/principal-view.component';

const routes: Routes = [
  {path:"", component:PrincipalViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
