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
  pass:any="";
  bandera=0;
  uid:string;
  espiar = false;
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
           this._usuario.usuarioLogueado$.emit("logueado");
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

  olvide(){
    if(this.mail==''){
      this.bandera=1;
      return;
    }
    this._usuario.getUsuarioByMail(this.mail).subscribe((resp:any)=>{
      
      this.uid=resp[0].uid;
      this._usuario.repass$.emit(this.uid);
    });
    
    document.getElementById('btnRandom').click();
    
    this.pass=Math.floor(Math.random() * 9999) + 1000;
    
    
  }


  cerrar(){
    this._usuario.cambiarPass(this.pass, this.uid);
    document.getElementById('dismiss').click();
    this._r.navigateByUrl('/repass');
  }


  mostrarPassword(){
    this.espiar=true;
    (document.getElementById('contra') as HTMLInputElement).type = "text";
  }


  ocultarPassword(){
    this.espiar = false;
    (document.getElementById('contra') as HTMLInputElement).type = "password";
  }

}
