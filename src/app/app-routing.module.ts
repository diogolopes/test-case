import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContribuintesComponent } from './resources/views/main/dirf/contribuintes/contribuintes.component'
import { InformesComponent } from './resources/views/main/dirf/informes/informes.component';
import { MainviewComponent } from './resources/views/main/home/mainview/mainview.component';
import { ImportacoesComponent } from './resources/views/main/dirf/importacoes/importacoes.component';

const routes: Routes = [{
  path: '',
  component: MainviewComponent
},
{
  path: 'main/home',
  component: MainviewComponent
},
{
  path: 'main/dirf/contribuintes', component: ContribuintesComponent
},
{ path: 'main/dirf/informes', component: InformesComponent }
,
{ path: 'main/dirf/importacoes', component: ImportacoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
