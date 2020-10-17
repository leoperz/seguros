import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(private _firestore: AngularFirestore) { }

  guardarInforme(payload:any){
    return this._firestore.collection('informe').add(payload);
  }
}
