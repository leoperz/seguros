import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './componentes/agenda/agenda.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { InformeComponent } from './componentes/informe/informe.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'registrarse', component:RegistrarComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'agenda', component:AgendaComponent},
  {path:'informe', component:InformeComponent},
  {path:'', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
