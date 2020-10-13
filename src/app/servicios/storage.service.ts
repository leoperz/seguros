import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  setLocalStorage(payload:any){
    
    localStorage.setItem('identity',JSON.stringify(payload));
  }


}



