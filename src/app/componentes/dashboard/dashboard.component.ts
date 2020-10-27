import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/servicios/informe.service';
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
  burzaco:number=0;
  guernica:number=0;
  long:number=0;
  constructor(private _storage : StorageService, private _info : InformeService ) { }

  ngOnInit() {
    this.usuario=this._storage.getLocalStorage();
    
    this._info.getInformesSucursal('Burzaco').subscribe((resp:any[])=>{
      console.log("burzaco-->", resp)
      this.burzaco= resp.length;
    });
    this._info.getInformesSucursal('Guernica').subscribe((resp:any[])=>{
      console.log("guernica-->", resp)
      this.guernica= resp.length;
    });
    this._info.getInformesSucursal('Longchamps').subscribe((resp:any[])=>{
      console.log("long-->", resp)
      this.long= resp.length;
    });
    
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
