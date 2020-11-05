import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { MenuComponent } from '../component/menu.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: MenuComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
