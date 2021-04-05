import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  //urlBack:string = 'https://segurosalvarenga.herokuapp.com/';
  urlBack:string = 'http://localhost:5500/';
  constructor(private _fireStorage: AngularFireStorage,private _http: HttpClient) { }


  /*Llamadas a servicios del back end de Heroku*/

  public generarZip(archivos:[],sucursal:string){
    
    let payload={archivos:archivos};

    return this._http.post(this.urlBack+'download',payload,{responseType:'blob'});
  }

  public enviarMail(payload:any){
    console.log("se envia el mail");
    return this._http.post(this.urlBack+'enviarMail',payload);
  }


  /*Llamadas a servicios del back end de Heroku*/



  

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
