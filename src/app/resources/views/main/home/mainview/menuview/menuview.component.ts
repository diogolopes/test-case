import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { menus } from '../../../../../models/menus';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.css']
})
export class MenuviewComponent implements OnInit {
  title = 'portal-legais-regulatorios-front';
  userId = '1';
  items: MenuItem[];
  menus: menus[];
  loading = false;
  errorMessage;

  visibleSidebar1;

  constructor(private menuService: MenuService) {
    this.ngOnInit();
  }

  ngOnInit() {
    const replacePainel = /painel/gi;
    const replaceSubmenus = /submenus/gi;

    this.loading = true;
    this.errorMessage = '';
    this.menuService.getMenus(this.userId)
    .subscribe(
      (response) => {                           // next() callback
        console.log('response received');
        this.items = JSON.parse(JSON.stringify(response).replace(replacePainel, 'label').replace(replaceSubmenus, 'items'));
      },
      (error) => {                              // error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {                                   // complete() callback
        this.loading = false;
      }
    );
  }

}
