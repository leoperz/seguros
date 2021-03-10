import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MailService {
 

  constructor(private _firestore: AngularFirestore) { }

  guardarMail(payload){
   
    this._firestore.collection('mails').add(payload).then(resp=>{
      this._firestore.collection('mails').doc(resp.id).update({uid:resp.id});
    });
  }

  getMails(){
    return this._firestore.collection('mails').valueChanges();
  }


  actualizarMail(payload:any , uid:string) {
    console.log(payload.direccion,uid);
    this._firestore.collection('mails').doc(uid).update({
      tipo:payload.tipo,
      direccion:payload.direccion

    });
  }



}
