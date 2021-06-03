import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/servicios/informe.service';
import * as moment from 'moment'
import { StorageService } from 'src/app/servicios/storage.service';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import {UserOptions}   from 'jspdf-autotable';
import saveAs from "file-saver";
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { SucursalService } from 'src/app/servicios/sucursal.service';



interface jsPDFWithPlugin extends jsPDF{
  [x: string]: any;
  autotable:(options: UserOptions)=>jsPDF;
}

@Component({
  selector: 'app-tabla-filtro',
  templateUrl: './tabla-filtro.component.html',
  styleUrls: ['./tabla-filtro.component.css']
})
export class TablaFiltroComponent implements OnInit {

  p:number=1;
  page:number=5;
  desde:string="";
  hasta:string="";
  array:any[]=[];
  lista:any[]=[];
  usuario:any={};
  reclamante:any={};
  flag:any="";
  notas:any[]=[];
  obser="";
  estado="";
  sucursal="";
  seleccion:string="Pendiente";
  esSoloNota:boolean = false;
  
  resolucion:boolean = true;

  constructor( private _info: InformeService, private _stor :StorageService, private _noti: NotificacionService,
               private  _firestore: FirestorageService, private _sucursales: SucursalService ) { }

  ngOnInit() {
    this.usuario = this._stor.getLocalStorage();

    if(this.usuario.perfil == "abogado" || this.usuario.perfil == "adm"){
      this._info.getInformes().subscribe(resp=>{
        this.array=[];
        for(let u of resp){
          this.array.push(u);
        }
      });
    }

    if(this.usuario.perfil=="operador"){
      this._info.getInformesSucursal(this.usuario.sucursal).subscribe(
        resp=>{
          
          this.array=[];
          for(let i of resp){
            this.array.push(i);
          }
          
        }
      );
    }
     
    }

    private formarteo(fecha:string){
      let aux = fecha.split('/');
      return aux[2]+"-"+aux[1]+"-"+aux[0];
    }

    buscar(){
      this.lista=[];
      let aux;
      for(let i of this.array){
        aux = this.formarteo(i.fechaAlta); 
        
        if(moment(aux).isBetween(this.desde,this.hasta) || moment(aux).isSame(this.desde) || moment(aux).isSame(this.hasta)){
          this.lista.push(i);
        }
    }
     
  }

  test(archivos:[],sucursal:string){
    
    document.getElementById('load').click();
    this._firestore.generarZip(archivos,sucursal).subscribe(data=>{
      saveAs(data,`${sucursal}.zip`);
      document.getElementById('dismiss').click();
    });
    
  }

  cambiarItems(number:any){
    this.page=number;
  }

  cambiarEstado(value:string, uid:string,item:any){
    
    this.sucursal=item.usuario.sucursal;
    if(value=='Liquidado'){
      //abrir modal para ingreso de indemnizacion
      this.flag=uid;
      document.getElementById('btnIndemnizacion').click();
      let fecha = moment().format('DD/MM/yyyy');
      this._info.updateFechaLiquidacion(fecha,uid);
    }
    if(value=="Observado"||value=="Rechazado"||value=="Cerrado"){
      this.estado=value;
      this.flag=uid;
      this.notas=[];
      for(let i of item.notas){
        this.notas.push(i);
      }
      this.abrirVentanaObservacion();
      if(value == "Cerrado"){
        //actualizo fecha de cierre
        
        let fecha = moment().format('DD/MM/yyyy');
        this._info.updateFechaCierre(fecha,uid);
      }
      return;
    }

    this._info.updateEstado(value, uid);
  }

  abrirVentanaObservacion(){
    this.esSoloNota=false;
    document.getElementById('btnObservacion').click();
  }

  abrirVentanaAgregarNotas(uid:string,item:any){
    this.flag=uid;
    this.esSoloNota=true;
    
    document.getElementById('btnObservacion').click();
    for(let i of item.notas){
      this.notas.push(i);
    }
  }


  guardarIndemnizacion(){
    this._info.updateEstado2((document.getElementById('importe') as HTMLInputElement).value,this.flag);
    this._info.updateEstado(this.estado, this.flag).then(data=>{
      this.buscar();
    });
      let variable ={
      motivo:"Se ha cambiado el estado de un informe",
      sucursal: this.sucursal,
      fecha: moment().format('DD/MM/yyyy')
    }
    this._noti.guardarNotificacion(variable);
    
  }


  verReclamante(item:any){
    
    this.reclamante=item;
    document.getElementById('btnReclamante').click();
  }


  verVehiculo(item:any){
    
    this.reclamante=item;
    document.getElementById('btnVehiculo').click();
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
    
    if (this.esSoloNota!=true){
      this._info.updateEstado(this.estado, this.flag).then(data=>{
         this.buscar();
      });

      let variable ={
        motivo:"Se ha cambiado el estado de un informe",
        sucursal: this.sucursal,
        fecha: moment().format('DD/MM/yyyy')
      }
      this._noti.guardarNotificacion(variable);
    }

 }


  verNotas(notas:[]){
    this.notas=[];
    document.getElementById('btnNotas').click();
    for(let i of notas){
      this.notas.push(i);
    }
  }

  onItemChange(item:any){
    console.log(item);
    this.seleccion=item;

  }

  exportar(){

    let body:any[]=[];
    let aux:string[];
    for(let i of this.lista){
      aux=[];
      if(i.estado== this.seleccion){
        aux[0]=i.usuario.sucursal;
        aux[1]=i.compania;
        aux[2]=i.nombreCompleto +" "+i.apellido;
        aux[3]=i.dominio;
        aux[4]=i.indemnizacion;
        aux[5]=i.estado;
        body.push(aux);
      }
      
    }
    

    const doc = new jsPDF('portrait','px','a4') as jsPDFWithPlugin;
    doc.autoTable({
      head:[
        ['SUCURSAL','COMPAÑIA DE TERCEROS','DATOS DEL RECLAMANTE','DATOS DEL VEHICULO','MONTO DE INDEMNIZACION','ESTADO']
      ],
      body:body
      
    });    
  
    doc.save("documento.pdf");   

    
  }

  abrirSeleccion(){
    document.getElementById('btnSeleccion').click();
  }


  generarRecibo(item:any){

    let valor = item.indemnizacion.replace('$','').trim().replace('.','').replace(',','.');
    valor = parseFloat(valor);
    this._sucursales.getPorcentaje(item.usuario.sucursal).subscribe((resp:any)=>{
      valor =  (resp[0].porcentaje * valor / 100);
      valor = parseFloat(valor).toFixed(2);
      let payload={
        fecha: moment().format('DD/MM/yyyy'),
        emitido:this.usuario.nombre + " " + this.usuario.apellido,
        cliente:item.nombreCompleto + " " + item.apellido,
        cantidad:1,
        precioU: valor,
        precioTotal:valor,
        totalPagar:valor
      };
      this._firestore.generarRecibo(payload).subscribe((resp:any)=>{
        console.log("repuesta del servicio-->",resp);
        if(resp.messagge == "ok"){
           
           this._firestore.descargarRecibo().subscribe(
              data=>saveAs(data,'recibo'),
              error=>console.log(error)
          );
          
          
        }else{
          console.log('hubo un problema');
        }
      });
      
    });
    
   
  }

}


