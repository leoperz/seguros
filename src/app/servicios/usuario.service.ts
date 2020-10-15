import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as crypt from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _fire: AngularFirestore) { }



  registrarUsuario(payload:any){
    payload.password = crypt.AES.encrypt(payload.password, 'arielSeguros').toString();
    console.log(payload.password);
    this._fire.collection('usuarios').add(payload).then(resp=>{
      this._fire.collection('usuarios').doc(resp.id).update({
        uid:resp.id
      })
    });
    
  }

  InicioSesion(payload:any){
   return this._fire.collection('usuarios', ref=>ref.where("mail","==",payload.mail)).valueChanges();
  }

  comprobarPass(pass:string, password:string){
    
    let des = crypt.AES.decrypt(pass,"arielSeguros").toString(crypt.enc.Utf8);
    if(des == password){
      return true;
      }else{
        false;
      }
  }

  getUsuarios(){
    return this._fire.collection('usuarios').valueChanges();
  }

  getUsuariosPorSucursal(sucursales:string[]){
    return this._fire.collection('usuarios', resp=>resp.where('sucursal','in', sucursales)).valueChanges();
  }

}
