import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailService } from 'src/app/servicios/mail.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {

  deshabilitadoR=0;
  deshabilitado=0;
  mailOrigen="";
  uidMailOrigen="";
  uidMailDestino="";
  mailDestino="";
  asunto="";
  mensaje="";
  list:string[]=[];
  
  constructor(private _mails: MailService, private _route: Router ) { }

  ngOnInit() {
    this._mails.getMails().subscribe(
      (data:any[])=>{
        if(data.length > 0){
          for(let i of data){
            
              
              
              this.asunto= "asunto: " + i.asunto;
              this.mensaje= "mensaje: " + i.mensaje;
              this.mailOrigen=i.de;
              this.mailDestino = i.para;
              this.uidMailOrigen=i.uid;
              this.guardarCorreo();
              this.guardarCorreoReceptor();
            
            
          }
        }
      }
    );
  }


  guardarCorreoReceptor(){
    this.deshabilitadoR=1;
    (document.getElementById('mailHasta') as HTMLInputElement).disabled = true;
  }


  modificarCorreoReceptor(){
    this.deshabilitadoR=0;
    (document.getElementById('mailHasta') as HTMLInputElement).disabled = false;
  }



  guardarCorreo(){
    this.deshabilitado=1;
    (document.getElementById('mailDesde') as HTMLInputElement).disabled = true;
  }

  modificarCorreo(){
    this.deshabilitado=0;
    (document.getElementById('mailDesde') as HTMLInputElement).disabled = false;
  }

 



  aceptarSalir(){
    

    let payload = {
      de:this.mailOrigen,
      para:this.mailDestino,
      asunto:this.asunto.replace("asunto: ",""),
      mensaje:this.mensaje.replace("mensaje: ","")
    }

    console.log("payload-->",payload)


    if(this.uidMailOrigen==""){
      
      this._mails.guardarMail(payload);
      this.asunto= "asunto: " + payload.asunto;
      this.mensaje= "mensaje: " + payload.mensaje
    }else{
      

      this._mails.actualizarMail(payload,this.uidMailOrigen);
      this.asunto= "asunto: " + payload.asunto;
      this.mensaje= "mensaje: " +  payload.mensaje;
    }
    
    
  }

}
