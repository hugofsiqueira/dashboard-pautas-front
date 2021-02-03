import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPautasComponent } from './componentes/dashboard-pautas/dashboard-pautas.component';


const routes: Routes = [
  { path: '', component: DashboardPautasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
