import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/servicios/sucursal.service';
import * as moment from 'moment';
import { InformeService } from 'src/app/servicios/informe.service';
import { NumberFormatPipe } from '../../pipes/numer';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {UserOptions}   from 'jspdf-autotable'

interface jsPDFWithPlugin extends jsPDF{
  [x: string]: any;
  autotable:(options: UserOptions)=>jsPDF;
}

@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.component.html',
  providers:[NumberFormatPipe],
  styleUrls: ['./liquidaciones.component.css']
})
export class LiquidacionesComponent implements OnInit {

  porcentaje:string="";
  sucursales:any[]=[];
  nombre:string="";
  btncambiar=false;
  desde:string="";
  hasta:string="";
  array:any[]=[];
  lista:any[]=[];
  guernica:number=0;
  burzaco:number=0;
  longchamps:number=0;
  guernicaFront:number;
  burzacoFront:number;
  longchampsFront:number;
  total:number=0;

  constructor(private _sucu : SucursalService, private _info: InformeService, private formatPipe: NumberFormatPipe) { }

  ngOnInit() {
    
    this._sucu.getPorcentajes().subscribe((resp:any)=>{
      this.sucursales=[];
      for(let i of resp){
        this.sucursales.push(i);
      }
    });

    this._info.getInformes().subscribe((resp:any)=>{
      this.array=[];
      for(let i of resp){

        if(i.estado=="Cerrado")this.array.push(i);
      }
      console.log(this.array);
    });

  }

  cambiar(nombre:any){
  
    this.nombre=nombre;
    this.btncambiar=true;
  }

  aceptar(uid:any){
    this.nombre="";
    this._sucu.cambiarPorcentaje(uid,this.porcentaje);

  }

  private formarteo(fecha:string){
    let aux = fecha.split('/');
    return aux[2]+"-"+aux[1]+"-"+aux[0];
  }

  buscar(){
    this.total=0;
    this.guernica=0;
    this.longchamps=0;
    this.burzaco=0;
    this.longchampsFront=0;
    this.burzacoFront=0;
    this.guernicaFront=0;
    
    console.log(this.desde, this.hasta);
    this.lista=[];
    let aux;
    for(let i of this.array){
      aux = this.formarteo(i.fechaAlta); 
      
      if(moment(aux).isBetween(this.desde,this.hasta) || moment(aux).isSame(this.desde) || moment(aux).isSame(this.hasta)){
        this.lista.push(i);
      }
  }
  
    for(let i of this.lista){

      if(i.usuario.sucursal == "Guernica"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.guernica +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Burzaco"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.burzaco +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Longchamps"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.longchamps +=  parseFloat(aux);
      }

      
    }

    for(let i of this.sucursales){
      
      
      if(i.nombre == "Burzaco"){
      
        this.burzaco = (this.burzaco * i.porcentaje)/100;
        this.total += this.burzaco;
        this.burzacoFront=this.formatPipe.transform(this.burzaco.toFixed(2));
        

      
      }
      
      
      
        if(i.nombre == "Guernica"){
          this.guernica = (this.guernica * i.porcentaje)/100;
          this.total += this.guernica;
          this.guernicaFront = this.formatPipe.transform(this.guernica.toFixed(2));
          
        }
          
        if(i.nombre == "Longchamps"){
          this.longchamps = (this.longchamps * i.porcentaje)/100;
          this.total += this.longchamps;
          this.longchampsFront = this.formatPipe.transform(this.longchamps.toFixed(2));
          
    }


  }
    
    this.total = this.formatPipe.transform(this.total.toFixed(2));
    document.getElementById('totalesbtn').click();

  }

  exportar(){
    console.log(this.burzacoFront);
    let body:any[]=[];
    let aux:any[]=[];
    
    for(let i of this.sucursales){

      if(i.nombre == "Burzaco"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Burzaco";
        aux[2]= i.porcentaje;
        aux[3]=this.burzacoFront
        body.push(aux);
        aux=[];
      }
      if(i.nombre == "Guernica"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Guernica";
        aux[2]= i.porcentaje;
        aux[3]=this.guernicaFront
        body.push(aux);
        aux=[];
      }
      if(i.nombre == "Longchamps"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Longchamps";
        aux[2]= i.porcentaje;
        aux[3]=this.longchampsFront
        body.push(aux);
        aux=[];
      }
    }

    console.log(body);
    const doc = new jsPDF('portrait','px','a4') as jsPDFWithPlugin;
    doc.autoTable({
      head:[
        ['FECHA','SUCURSAL','PORCENTAJE','TOTAL']
      ],
      body:body
      
    });    
  
    doc.save("documento.pdf"); 


  }

}


