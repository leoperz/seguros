import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-modificar-informe',
  templateUrl: './modificar-informe.component.html',
  styleUrls: ['./modificar-informe.component.css']
})
export class ModificarInformeComponent implements OnInit {

  p:number=1;
  page:number=5;
  informes:any[]=[];
  usuario:any={};
  flag:any="";
  reclamante:any={};

  constructor(private _info:InformeService,private _stor :StorageService) { }

  ngOnInit() {
    this.usuario = this._stor.getLocalStorage();
    if(this.usuario.perfil == "abogado" || this.usuario.perfil == "adm"){
      this._info.getInformes().subscribe((resp:any)=>{
        this.informes=[];
        for(let u of resp){
          if(u.estado == "Pendiente" || u.estado=="Observado") this.informes.push(u);
        }
      });
    }
    if(this.usuario.perfil=="operador"){
      this._info.getInformesSucursal(this.usuario.sucursal).subscribe(
        (resp:any)=>{
          
          this.informes=[];
          for(let i of resp){
            if(i.estado == "Pendiente" || i.estado=="Observado")this.informes.push(i);
          }
          
        }
      );
    }
  }


  modificarItem(item:any){
    console.log(item);
  }


}
