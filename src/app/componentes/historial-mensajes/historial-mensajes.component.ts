import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-historial-mensajes',
  templateUrl: './historial-mensajes.component.html',
  styleUrls: ['./historial-mensajes.component.css']
})
export class HistorialMensajesComponent implements OnInit {
  
  mensajes:any[]=[];
  usuario:any;
  constructor(private _mens: MensajeService, private _storage : StorageService) { }

  ngOnInit() {
    this.usuario = this._storage.getLocalStorage();

    if(this.usuario.perfil == 'adm'){
      this._mens.getMensajesEnviados().subscribe(resp=>{
        this.mensajes=[];
        for(let i of resp){
          this.mensajes.push(i);
        }
      });
    }
    else{
      this._mens.getMensajes(this.usuario.uid).subscribe(resp=>{
        this.mensajes=[];
        for(let i of resp){
          this.mensajes.push(i);
        }
        console.log(this.mensajes);
      });
    }


  
  }

  borrarMensaje(i:any){
    this._mens.borrarMensaje(i.uid).then();
  }


  borrarUsuarioMensaje(i:any){
    console.log(i);
    this._mens.borrarUsuarioMensaje(i.uid).then();
  }

}
