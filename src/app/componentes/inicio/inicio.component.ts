import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  flag = 0;
  mail:string="";
  password:string="";
  constructor(private _r : Router, private _usuario:UsuarioService, private _storage: StorageService) { }

  ngOnInit() {
    document.getElementById('boton').click();
  }


 

  registrarse(){
    this._r.navigateByUrl('/registrarse')
  }


  iniciarSesion(){
    this._usuario.InicioSesion({mail:this.mail, password:this.password}).subscribe(
      (resp:any)=>{
        if(resp.length!=0){
         let value= this._usuario.comprobarPass(resp[0].password, this.password);
         if(value){
           this._storage.setLocalStorage(resp[0]);
           document.getElementById('botonCerrar').click();
           this._r.navigateByUrl("dashboard");

           
         }else{
           this.password="";
           this.flag=1;
         }
        }else{
          this.flag=1;
          
          this.password="";
        }
        
      }
    );
  }

}
