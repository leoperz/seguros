import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  setLocalStorage(payload:any){

    if(localStorage.getItem('identity')){
      localStorage.removeItem('identity');
    }
    
    localStorage.setItem('identity',JSON.stringify(payload));
  }


  getLocalStorage(){
    return JSON.parse(localStorage.getItem('identity'));
    
  }

  removeLocalStorage(){
    localStorage.removeItem('identity');
    
  }

  modificarImagenStorage(url:string){
    let payload = this.getLocalStorage();
    payload.imagen = url;
    this.setLocalStorage(payload);
  }


}



