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
import { TablaInformeComponent } from './componentes/tabla-informe/tabla-informe.component';
import { AdmService } from './servicios/adm.service';
import { GuardService } from './servicios/guard.service';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'registrarse', component:RegistrarComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[GuardService]},
  {path:'agenda', component:AgendaComponent, canActivate:[GuardService]},
  {path:'informe', component:InformeComponent, canActivate:[GuardService]},
  {path:'verinformes', component:TablaInformeComponent, canActivate:[GuardService]},
  {path:'repass', component:RepasswordComponent},
  {path:'historial', component:HistorialMensajesComponent, canActivate:[GuardService]},
  {path:'operadores', component:OperadoresComponent, canActivate:[GuardService, AdmService]},
  {path:'', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
