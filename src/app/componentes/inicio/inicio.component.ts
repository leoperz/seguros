import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  constructor(private _r : Router, private _usuario:UsuarioService) { }

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
           console.log("todo bien");
           
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
