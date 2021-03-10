import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailService } from 'src/app/servicios/mail.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {

  deshabilitado=0;
  mailOrigen="";
  uidMailOrigen="";
  uidMailDestino="";
  mailDestino="";
  list:string[]=[];
  
  constructor(private _mails: MailService, private _route: Router ) { }

  ngOnInit() {
    this._mails.getMails().subscribe(
      (data:any[])=>{
        if(data.length > 0){
          for(let i of data){
            if(i.tipo == "receptor"){
              this.list=i.direccion;
              this.uidMailDestino=i.uid;
            }else{
              this.mailOrigen=i.direccion;
              this.uidMailOrigen=i.uid;
              this.guardarCorreo();
            }
            
          }
        }
      }
    );
  }

  guardarCorreo(){
    this.deshabilitado=1;
    (document.getElementById('mailDesde') as HTMLInputElement).disabled = true;
  }

  modificarCorreo(){
    this.deshabilitado=0;
    (document.getElementById('mailDesde') as HTMLInputElement).disabled = false;
  }

  agregarCorreo(){
    this.list.push(this.mailDestino);
    this.mailDestino="";

  }

  borrarMail(item:any){
    
    this.list.splice(this.list.indexOf(item),1);
  
  }

  aceptarSalir(){
    let payload = {
      tipo:"emisor",
      direccion:this.mailOrigen
    };
    let payload2 = {
      tipo:"receptor",
      direccion:this.list
    };


    if(this.uidMailOrigen==""){
      
      this._mails.guardarMail(payload);
    }else{
      
      this._mails.actualizarMail(payload,this.uidMailOrigen);
    }
    
    
    if(this.uidMailDestino==""){
      console.log("entra en this.uidMailDestino")
      this._mails.guardarMail(payload2);
      
    }else{
      console.log("lista-->",this.list);
      this._mails.actualizarMail(payload2,this.uidMailDestino);
    }


    
    this._route.navigateByUrl('/dashboard');
    
  }

}
