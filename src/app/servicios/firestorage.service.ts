import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private _fireStorage: AngularFireStorage) { }



  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this._fireStorage.upload(nombreArchivo, datos);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this._fireStorage.ref(nombreArchivo);
  }


}
