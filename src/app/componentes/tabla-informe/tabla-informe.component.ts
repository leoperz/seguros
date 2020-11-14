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
  reclamante:any={};
  

  constructor(private _info:InformeService, private _stor :StorageService) { }

  ngOnInit() {

    this.usuario = this._stor.getLocalStorage();
    
    if(this.usuario.perfil == "abogado" || this.usuario.perfil == "adm"){
      this._info.getInformes().subscribe(resp=>{
        this.informes=[];
        for(let u of resp){
          this.informes.push(u);
        }
      });
    }

    if(this.usuario.perfil=="operador"){
      this._info.getInformesSucursal(this.usuario.sucursal).subscribe(
        resp=>{
          
          this.informes=[];
          for(let i of resp){
            this.informes.push(i);
          }
          
        }
      );
    }
    }
  


  cambiarItems(number:any){
    this.page=number;
  }



  cambiarEstado(value:string, uid:string){
    if(value=='Resuelto'){
      //abrir modal para ingreso de indemnizacion
      this.flag=uid;
      document.getElementById('btnIndemnizacion').click();
    }

    this._info.updateEstado(value, uid);
  }

  guardarIndemnizacion(){
    this._info.updateEstado2((document.getElementById('importe') as HTMLInputElement).value,this.flag);
    
  }

  verReclamante(item:any){
    
    this.reclamante=item;
    document.getElementById('btnReclamante').click();
  }


  verVehiculo(item:any){
    
    this.reclamante=item;
    document.getElementById('btnVehiculo').click();
  }


  test(archivos:[]){
    console.log("estos son los archivos-->",archivos);
    for(let i of archivos){
    let a = document.createElement('a');
    a.href = i;
    a.download = "title";
    document.body.appendChild(a);
    a.target="_blank";
    a.click();
    a.remove();
    }
    
  }

  borrarRegistro(uid:string){
    this._info.delete(uid);
  }

}
