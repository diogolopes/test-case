import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE  } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import {FileUploadModule} from 'primeng/fileupload';
//import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesConsultaComponent } from './resources/views/pvt/dirf/clientes-consulta/clientes-consulta.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRowDirective } from './add-row.directive';
import { MenuComponent } from './resources/views/pvt/dirf/component/menu.component';
import { MenuService } from './resources/services/menu.service';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InformeRendimentosComponent } from './resources/views/pvt/dirf/informe-rendimentos/informe-rendimentos.component';
import { UserIdleModule } from 'angular-user-idle';
import { MainviewComponent } from './resources/views/main/home/mainview/mainview.component';
import { HeaderviewComponent } from './resources/views/main/home/mainview/headerview/headerview.component';
import { FooterviewComponent } from './resources/views/main/home/mainview/footerview/footerview.component';
import { MenuviewComponent } from './resources/views/main/home/mainview/menuview/menuview.component';
import { ContribuintesComponent } from './resources/views/main/dirf/contribuintes/contribuintes.component';
import { InformesComponent } from './resources/views/main/dirf/informes/informes.component';
import {FieldsetModule} from 'primeng/fieldset';
import { ImportacaoMovimentosComponent } from './resources/views/pvt/dirf/importacao-movimentos/importacao-movimentos.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    AddRowDirective,
    ClientesConsultaComponent,  
    InformeRendimentosComponent,  
    MenuComponent,   
    MainviewComponent,
    HeaderviewComponent,
    FooterviewComponent,
    MenuviewComponent,
    ContribuintesComponent,
    InformesComponent,
    ImportacaoMovimentosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    FormsModule,
    CardModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    FieldsetModule,
    ButtonModule,
    SidebarModule,
    TableModule,    
    BreadcrumbModule,
	  ProgressSpinnerModule,
    TabViewModule,
    InputMaskModule,
    InputTextareaModule,
    OverlayPanelModule,
    CalendarModule,
    MessagesModule,
    FileUploadModule,
    MessageModule,
    ToastModule,
    MegaMenuModule,
    DynamicDialogModule,
    DialogModule,    
    UserIdleModule,
    CurrencyMaskModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MessageService
    ,{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
   },
   {
     provide: DEFAULT_CURRENCY_CODE,
     useValue: 'BRL'
   },
   {
     provide: MenuService
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
