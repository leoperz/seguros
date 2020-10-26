import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {
 operador:any={};

  
  constructor() { }





  setOperador(item: any) {
    this.operador=item;
  }

  getOperador(){
    return this.operador;
  }


}
