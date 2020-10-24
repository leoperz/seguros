import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario:any={};
  mensaje=false;
  informes=false;
  flecha:string="abajo";
  flechamsn:string="abajo";
  constructor(private _storage : StorageService ) { }

  ngOnInit() {
    this.usuario=this._storage.getLocalStorage();
    console.log(this.usuario);
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
