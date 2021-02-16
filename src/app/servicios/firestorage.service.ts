import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  urlBack:string = 'http://localhost:5500/';
  constructor(private _fireStorage: AngularFireStorage,private _http: HttpClient) { }



  public generarZip(archivos:[],sucursal:string){
    
    let payload={archivos:archivos};

    return this._http.post(this.urlBack+'download',payload,{responseType:'blob'});
  }
  

  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this._fireStorage.upload(nombreArchivo, datos);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    
    return this._fireStorage.ref(nombreArchivo);
    
  }

  public borrarImagen(nombreArchivo: string) {
    return this._fireStorage.ref(nombreArchivo).delete();
  }

 


}
