import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-tabla-informe',
  templateUrl: './tabla-informe.component.html',
  styleUrls: ['./tabla-informe.component.css']
})
export class TablaInformeComponent implements OnInit {

  p:number=1;
  page:number=5;
  informes:any[]=[];
  usuario:any={};
  flag:any="";

  constructor(private _info:InformeService, private _stor :StorageService) { }

  ngOnInit() {
    this.usuario = this._stor.getLocalStorage();
    this._info.getInformesSucursal(this.usuario.sucursal).subscribe(
      resp=>{
        
        this.informes=[];
        for(let i of resp){
          this.informes.push(i);
        }
        console.log(this.informes);
      }
    );
  }


  cambiarEstado(value:string, uid:string){
    if(value=='Cerrado'){
      //abrir modal para ingreso de indemnizacion
      this.flag=uid;
      document.getElementById('btnIndemnizacion').click();
    }

    this._info.updateEstado(value, uid);
  }

  guardarIndemnizacion(){
    this._info.updateEstado2((document.getElementById('importe') as HTMLInputElement).value,this.flag);
    
  }

}
