import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mensaje=false;
  informes=false;
  flecha:string="abajo";
  flechamsn:string="abajo";
  constructor() { }

  ngOnInit() {
  }

  mensajes(){
    this.mensaje=true;
  }

  verInformes(){
    this.informes=true;
  }

  test(){
    if(this.flecha=="abajo") this.flecha="arriba"
    else this.flecha="abajo"
  }

  flechaMensaje(){
    if(this.flechamsn=="abajo") this.flechamsn="arriba"
    else this.flechamsn="abajo"
  }
}
