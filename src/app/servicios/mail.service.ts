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

  getMailEmisor(){
    return this._firestore.collection('mails', resp=>resp.where('tipo','==','emisor')).valueChanges();
  }


  actualizarMail(payload:any , uid:string) {
    
    this._firestore.collection('mails').doc(uid).update({
      de : payload.de,
      para:payload.para,
      asunto: payload.asunto,
      mensaje:payload.mensaje

    });
  }



}
