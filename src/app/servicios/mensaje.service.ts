import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private _fire: AngularFirestore, private  _usuario:UsuarioService) { }


  enviarMensaje(payload:any){
    console.log("entra en la funcion");
    this._fire.collection('mensajes').add(payload).then(resp=>{
      this._fire.collection('mensajes').doc(resp.id).update({
        uid:resp.id
      });
      if(payload.tipo=="general"){
        let aux={};
        this._usuario.getUsuariosPorSucursal(payload.para).subscribe((resp:any)=>{
          for(let i of resp){
            aux={
              usuario:i,
              mensaje:payload,
              leido:false
            }
            this._fire.collection('usuarioMensaje').add(aux).then(resp=>{
              this._fire.collection('usuarioMensaje').doc(resp.id).update({
                uid:resp.id
              })
            });
          }
        });
      }
      
      
    });


  }

  getMensajesEnviados(){
    return this._fire.collection('mensajes').valueChanges();
  }

  getMensajes(uid:string){
    
    return this._fire.collection('usuarioMensaje', (resp:any)=>resp.where('usuario.uid','==',uid)).valueChanges();
  }


  leerMensaje(uid:string){
    this._fire.collection('usuarioMensaje').doc(uid).update({
      leido:true
    });
  }


  getNotifiaciones(sucursal:string){
    return this._fire.collection('informe', resp=>resp.where('usuario.sucursal','==',sucursal )).valueChanges();
  }



}
