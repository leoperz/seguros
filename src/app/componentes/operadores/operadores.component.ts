import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {Router} from '@angular/router';
import { ReportesService } from 'src/app/servicios/reportes.service';




@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.css']
})
export class OperadoresComponent implements OnInit {

  
  colores=["primary","secondary","success", "danger","Warning","Info", "Dark"];
  aux:string = this.colores[Math.floor(Math.random()*this.colores.length)]; 
  class = "badge badge-pill badge-"+this.aux;
  guernica1:any[]=[];
  guernica2:any[]=[];
  guernica3:any[]=[];
  mercado:any[]=[];
  guillon:any[]=[];
  longchamps:any[]=[];
  constructor(private _r: Router, private _usu: UsuarioService, private _repo : ReportesService ) { }

  ngOnInit() {
    this._usu.getUsuariosPorSucursalOrdenados('Guillon').subscribe((resp:any)=>{
      this.guillon=[];
      for(let u of resp){
        this.guillon.push(u);
      }
      
    });
    this._usu.getUsuariosPorSucursalOrdenados('Guernica1').subscribe((resp:any)=>{
      this.guernica1=[];
      for(let u of resp){
        this.guernica1.push(u);
      }
      
    });

    this._usu.getUsuariosPorSucursalOrdenados('Guernica2').subscribe((resp:any)=>{
      this.guernica2=[];
      for(let u of resp){
        this.guernica2.push(u);
      }
      
    });

    this._usu.getUsuariosPorSucursalOrdenados('Guernica3').subscribe((resp:any)=>{
      this.guernica3=[];
      for(let u of resp){
        this.guernica3.push(u);
      }
      
    });
    this._usu.getUsuariosPorSucursalOrdenados('Longchamps').subscribe((resp:any)=>{
      this.longchamps=[];
      for(let u of resp){
        this.longchamps.push(u);
      }
      
    });

    this._usu.getUsuariosPorSucursalOrdenados('Mercado central').subscribe((resp:any)=>{
      this.mercado=[];
      for(let u of resp){
        this.mercado.push(u);
      }
      
    });
  }


  
  reportes(item:any){
    this._repo.setOperador(item);
    this._r.navigateByUrl('reportes');
  }

  

}
