import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { HistorialMensajesComponent } from './componentes/historial-mensajes/historial-mensajes.component';
import { InformeComponent } from './componentes/informe/informe.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { OperadoresComponent } from './componentes/operadores/operadores.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { RepasswordComponent } from './componentes/repassword/repassword.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import {MensajeComponent} from './componentes/mensaje/mensaje.component'
import { GuardService } from './servicios/guard.service';
import { TablaFiltroComponent } from './componentes/tabla-filtro/tabla-filtro.component';
import { ModificarInformeComponent } from './componentes/modificar-informe/modificar-informe.component';
import { LiquidacionesComponent } from './componentes/liquidaciones/liquidaciones.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'registrarse', component:RegistrarComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[GuardService]},
  {path:'agenda', component:AgendaComponent, canActivate:[GuardService]},
  {path:'informe', component:InformeComponent, canActivate:[GuardService]},
  {path:'verinformes', component:TablaFiltroComponent, canActivate:[GuardService]},
  {path:'repass', component:RepasswordComponent},
  {path:'historial', component:HistorialMensajesComponent, canActivate:[GuardService]},
  {path:'operadores', component:OperadoresComponent, canActivate:[GuardService]},
  {path:'reportes', component:ReportesComponent, canActivate:[GuardService]},
  {path:'mensaje', component:MensajeComponent, canActivate:[GuardService]},
  {path:'modificarinformes', component:ModificarInformeComponent, canActivate:[GuardService]},
  {path:'liquidaciones', component:LiquidacionesComponent, canActivate:[GuardService]},
  {path:'', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
