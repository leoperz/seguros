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
  guernica:any[]=[];
  burzaco:any[]=[];
  longchamps:any[]=[];
  constructor(private _r: Router, private _usu: UsuarioService, private _repo : ReportesService ) { }

  ngOnInit() {
    this._usu.getUsuariosPorSucursalOrdenados('Burzaco').subscribe((resp:any)=>{
      this.burzaco=[];
      for(let u of resp){
        this.burzaco.push(u);
      }
      
    });
    this._usu.getUsuariosPorSucursalOrdenados('Guernica').subscribe((resp:any)=>{
      this.guernica=[];
      for(let u of resp){
        this.guernica.push(u);
      }
      
    });
    this._usu.getUsuariosPorSucursalOrdenados('Longchamps').subscribe((resp:any)=>{
      this.longchamps=[];
      for(let u of resp){
        this.longchamps.push(u);
      }
      
    });
  }
  
  reportes(item:any){
    this._repo.setOperador(item);
    this._r.navigateByUrl('reportes');
  }

  

}
