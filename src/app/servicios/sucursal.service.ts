import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private _firestore: AngularFirestore) { }


  getPorcentaje(sucursal:string){
    return this._firestore.collection('sucursales',ref=>ref.where("nombre",'==',sucursal)).valueChanges();
  }

  getPorcentajes(){
    return this._firestore.collection('sucursales', ref=>ref.orderBy("nombre")).valueChanges();
  }

  cambiarPorcentaje(uid:string, porcentaje:string){
    this._firestore.collection('sucursales').doc(uid).update({
      porcentaje:porcentaje
    });
  }
}
