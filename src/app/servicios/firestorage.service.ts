import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private _fireStorage: AngularFireStorage) { }



  subirArchivo(nombreArchivo:string, datos:any){
    return this._fireStorage.upload(nombreArchivo, datos);
  }

  referenciaCloudStorage(nombreArchivo:string){
    return this._fireStorage.ref(nombreArchivo);
   }


}
