import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url = '../../../assets/imagenes/sinfoto.png';
  usuario:any={};
  mensajes:any[]=[];
  sms:any={asunto:""};
  constructor(private _storage: StorageService, private _mens:MensajeService) { }

  ngOnInit() {
    this.usuario = this._storage.getLocalStorage();
    if(this.usuario.imagen !=''){

    }

    this._mens.getMensajes(this.usuario.uid).subscribe((resp:any)=>{
      
      this.mensajes=[];
      for(let i of resp){
        if(i.leido == false){
          this.mensajes.push(i);
        }
        
        
      }
      console.log(this.mensajes);
    });
      
  }


  verMensaje(mensaje:any){
    this.sms=mensaje.mensaje;
    this._mens.leerMensaje(mensaje.uid);
    document.getElementById('btnMensaje').click();


  }

}
