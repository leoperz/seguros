import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';
import * as moment from 'moment';

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
  notas:any[]=[];
  obser="";
  estado="";
  sucursal="";

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


  guardarNota(){
    
    if(this.obser!=""){
      let payload={
        fecha: moment().format('DD/MM/YYYY'),
        nota:this.obser
      }
      this.notas.push(payload);
      this._info.guardarNotas(this.flag,this.notas);
      this.obser="";
      this.notas=[];
      
    }
    
    this._info.updateEstado(this.estado, this.flag).then(data=>{
      
    });

    let variable ={
      motivo:"Se ha cambiado el estado de un informe",
      sucursal: this.sucursal,
      fecha: moment().format('DD/MM/yyyy')
    }
    this._noti.guardarNotificacion(variable);
    
  }



  cambiarEstado(value:string, uid:string,item:any){
    this.sucursal=item.usuario.sucursal;
    if(value=='Resuelto'){
      //abrir modal para ingreso de indemnizacion
      this.flag=uid;
      document.getElementById('btnIndemnizacion').click();
    }
    if(value=="Observado"){
      this.estado=value;
      this.flag=uid;
      this.notas=[];
      for(let i of item.notas){
        this.notas.push(i);
      }
      document.getElementById('btnObservacion').click();
      return;
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

  verNotas(notas:[]){
    this.notas=[];
    document.getElementById('btnNotas').click();
    for(let i of notas){
      this.notas.push(i);
    }
  }


  test(archivos:[]){
    console.log("estos son los ar",archivos);
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
