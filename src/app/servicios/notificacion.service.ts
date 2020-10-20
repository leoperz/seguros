import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private _firestore: AngularFirestore) { }




  guardarNotificacion(variable:any){
    this._firestore.collection('notificaciones').add(variable).then((resp:any)=>{
      this._firestore.collection('notificaciones').doc(resp).update(
        {
          uid:resp.id
        }
      );
    })
  }

  getNotificaciones(){
    return this._firestore.collection('notificaciones').valueChanges();
  }
}




