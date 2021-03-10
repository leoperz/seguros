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
  guernica1:number=0;
  guernica2:number=0;
  guernica3:number=0;
  guillon:number=0;
  mercado:number=0;
  longchamps:number=0;
  guernica1Front:number;
  guernica2Front:number;
  guernica3Front:number;
  guillonFront:number;
  longchampsFront:number;
  mercadoFront:number;
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
    this.porcentaje="";
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
    this.guernica1=0;
    this.guernica2=0;
    this.guernica3=0;
    this.longchamps=0;
    this.guillon=0;
    this.longchampsFront=0;
    this.guillonFront=0;
    this.guernica1Front=0;
    this.guernica2Front=0;
    this.guernica3Front=0;
    this.guillonFront = 0;
    
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

      if(i.usuario.sucursal == "Guernica1"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.guernica1 +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Guernica2"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.guernica2 +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Guernica3"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.guernica3 +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Guillon"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.guillon +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Longchamps"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.longchamps +=  parseFloat(aux);
      }

      if(i.usuario.sucursal == "Mercado central"){
        aux = (i.indemnizacion.slice(2,i.indemnizacion.length));
        aux = aux.replace('.','').replace(',','.');
        this.mercado +=  parseFloat(aux);
      }

      
    }

    for(let i of this.sucursales){
      
      
      if(i.nombre == "Guillon"){
      
        this.guillon = (this.guillon * i.porcentaje)/100;
        this.total += this.guillon;
        this.guillonFront=this.formatPipe.transform(this.guillon.toFixed(2));
        

      
      }
      
      
      
        if(i.nombre == "Guernica1"){
          this.guernica1 = (this.guernica1 * i.porcentaje)/100;
          this.total += this.guernica1;
          this.guernica1Front = this.formatPipe.transform(this.guernica1.toFixed(2));
          
        }

        if(i.nombre == "Guernica2"){
          this.guernica2 = (this.guernica2 * i.porcentaje)/100;
          this.total += this.guernica2;
          this.guernica2Front = this.formatPipe.transform(this.guernica2.toFixed(2));
          
        }

        if(i.nombre == "Guernica3"){
          this.guernica3 = (this.guernica3 * i.porcentaje)/100;
          this.total += this.guernica3;
          this.guernica3Front = this.formatPipe.transform(this.guernica3.toFixed(2));
          
        }
          
        if(i.nombre == "Longchamps"){
          this.longchamps = (this.longchamps * i.porcentaje)/100;
          this.total += this.longchamps;
          this.longchampsFront = this.formatPipe.transform(this.longchamps.toFixed(2));
          
    }


      if(i.nombre == "Mercado central"){
        this.mercado = (this.mercado * i.porcentaje)/100;
        this.total += this.mercado;
        this.mercadoFront = this.formatPipe.transform(this.mercado.toFixed(2));
      
}


  }
    
    this.total = this.formatPipe.transform(this.total.toFixed(2));
    document.getElementById('totalesbtn').click();

  }

  exportar(){
    
    let body:any[]=[];
    let aux:any[]=[];
    
    for(let i of this.sucursales){

      if(i.nombre == "Guillon"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Guillon";
        aux[2]= i.porcentaje;
        aux[3]=this.guillonFront
        body.push(aux);
        aux=[];
      }
      if(i.nombre == "Guernica1"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Guernica1";
        aux[2]= i.porcentaje;
        aux[3]=this.guernica1Front
        body.push(aux);
        aux=[];
      }

      if(i.nombre == "Guernica2"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Guernica2";
        aux[2]= i.porcentaje;
        aux[3]=this.guernica2Front
        body.push(aux);
        aux=[];
      }

      if(i.nombre == "Guernica3"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Guernica3";
        aux[2]= i.porcentaje;
        aux[3]=this.guernica3Front
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

      if(i.nombre == "Mercado central"){
        aux[0]= this.desde+" "+this.hasta;
        aux[1]= "Mercado central";
        aux[2]= i.porcentaje;
        aux[3]=this.mercadoFront
        body.push(aux);
        aux=[];
      }
    }
    const doc = new jsPDF('portrait','px','a4') as jsPDFWithPlugin;
    doc.autoTable({
      head:[
        ['FECHA','SUCURSAL','PORCENTAJE','SUB-TOTAL']
      ],
      body:body
      
    }
     
    
    
    );   
    doc.text(`Total: $${this.total}`, 35, doc.autoTable.previous.finalY + 20);
  
    doc.save("documento.pdf"); 


  }

}


