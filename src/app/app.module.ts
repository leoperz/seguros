import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
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
    TablaInformeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgMultiSelectDropDownModule,
    AngularFireStorageModule,
    NgxCurrencyModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
