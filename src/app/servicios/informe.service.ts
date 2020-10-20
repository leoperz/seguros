import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(private _firestore: AngularFirestore) { }

 


  getInformesSucursal(sucursal:string){
    return this._firestore.collection('informe', resp=>resp.where('usuario.sucursal','==',sucursal )).valueChanges();
  }

  getInformes(){
    return this._firestore.collection('informe').valueChanges();
  }

  guardarInforme(payload:any){
    this._firestore.collection('informe').add(payload).then(resp=>{
      this._firestore.collection('informe').doc(resp.id).update({
        uid:resp.id
      });
    })
  }


  updateEstado(value:string, uid:string){
    this._firestore.collection('informe').doc(uid).update({
      estado:value
    });
  }


  updateEstado2(value:string, uid:string){
    this._firestore.collection('informe').doc(uid).update({
      estado:"Cerrado",
      indemnizacion:value
    });
  }

}
