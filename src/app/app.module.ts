import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { MensajeComponent } from './componentes/mensaje/mensaje.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InformeComponent } from './componentes/informe/informe.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxCurrencyModule } from "ngx-currency";
import { TablaInformeComponent } from './componentes/tabla-informe/tabla-informe.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { RepasswordComponent } from './componentes/repassword/repassword.component';
import { HistorialMensajesComponent } from './componentes/historial-mensajes/historial-mensajes.component';
import { OperadoresComponent } from './componentes/operadores/operadores.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { ChartsModule } from 'ng2-charts';
import { TablaFiltroComponent } from './componentes/tabla-filtro/tabla-filtro.component';
import { ModificarInformeComponent } from './componentes/modificar-informe/modificar-informe.component';
import { LiquidacionesComponent } from './componentes/liquidaciones/liquidaciones.component';
import { NumberFormatPipe }     from './pipes/numer';
import { RouterModule } from '@angular/router';
import {routes} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MailsComponent } from './componentes/mails/mails.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistrarComponent,
    DashboardComponent,
    NavbarComponent,
    AgendaComponent,
    MensajeComponent,
    InformeComponent,
    TablaInformeComponent,
    RepasswordComponent,
    HistorialMensajesComponent,
    OperadoresComponent,
    ReportesComponent,
    TablaFiltroComponent,
    ModificarInformeComponent,
    LiquidacionesComponent,
    NumberFormatPipe,
    MailsComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgMultiSelectDropDownModule,
    AngularFireStorageModule,
    NgxCurrencyModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash:true}),
  ],
  providers: [NumberFormatPipe],
  bootstrap: [AppComponent],
  exports: [ NumberFormatPipe]
})
export class AppModule { }
