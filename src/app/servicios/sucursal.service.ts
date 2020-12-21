import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private _firestore: AngularFirestore) { }

  getPorcentajes(){
    return this._firestore.collection('sucursales').valueChanges();
  }

  cambiarPorcentaje(uid:string, porcentaje:string){
    this._firestore.collection('sucursales').doc(uid).update({
      porcentaje:porcentaje
    });
  }
}
