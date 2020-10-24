import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import { StorageService } from 'src/app/servicios/storage.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FirestorageService } from 'src/app/servicios/firestorage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url = '../../../assets/imagenes/sinfoto.png';
  usuario:any={};
  mensajes:any[]=[];
  sms:any={asunto:""};
  notificaciones:any[]=[];
  nombreArchivo = '';
  datosFormulario = new FormData();
  porcentaje = 0;
  finalizado = false;
  nombresArch:any[] =[];
  usuNombre="";
  usuApellido="";
  usuMail="";

  constructor(private _storage: StorageService, private _mens:MensajeService, private _noti: NotificacionService,
              private _r: Router, private _usu: UsuarioService, private _fireStorage: FirestorageService ) { }

  ngOnInit() {

    this._usu.usuarioLogueado$.subscribe(
      respuesta=>{
        this.usuario = this._storage.getLocalStorage();
        
        this.usuNombre=this.usuario.nombre;
        this.usuApellido=this.usuario.apellido;
        this.usuMail=this.usuario.mail;
        
        if(this.usuario.imagen=="")this.url="../../../assets/imagenes/sinfoto.png";
        else this.url=this.usuario.imagen;
        
        if(respuesta=="logueado"){
          
          this._noti.getNotificaciones().subscribe((resp:any)=>{
            this.notificaciones=[];
            
            for(let i of resp){
              
              if(this.usuario.perfil == "abogado" || this.usuario.perfil == "adm"){
                if(i.fecha.toString() == moment().format('DD/MM/yyyy').toString()){
                  this.notificaciones.push(i);
                }
              }
              
              if(i.sucursal == this.usuario.sucursal && i.fecha.toString() == moment().format('DD/MM/yyyy').toString()  ){
                this.notificaciones.push(i);
              }
              
            }
          });

          this._mens.getMensajes(this.usuario.uid).subscribe((resp:any)=>{
      
            this.mensajes=[];
            for(let i of resp){
              if(i.leido == false){
                this.mensajes.push(i);
              }
              
              
            }
            
          });



        }
      }
    );




    this.usuario = this._storage.getLocalStorage();
    if(this.usuario!=null)this.usuNombre=this.usuario.nombre;
    if(this.usuario!=null)this.usuApellido=this.usuario.apellido;
    if(this.usuario!=null)this.usuMail=this.usuario.mail;
    if(this.usuario!=null)if(this.usuario.imagen=="")this.url="../../../assets/imagenes/sinfoto.png";
        else this.url=this.usuario.imagen;
    
    if(this.usuario!=null){

      if(this.usuario.imagen !=''){

      }

      this._noti.getNotificaciones().subscribe((resp:any)=>{
        this.notificaciones=[];
        for(let i of resp){
          
          
          if(i.sucursal == this.usuario.sucursal && i.fecha.toString() == moment().format('DD/MM/yyyy').toString()  ){
            this.notificaciones.push(i);
          }
          
        }
      });


      this._mens.getMensajes(this.usuario.uid).subscribe((resp:any)=>{
      
        this.mensajes=[];
        for(let i of resp){
          if(i.leido == false){
            this.mensajes.push(i);
          }
          
          
        }
        
      });


    }

  

 

   
      
  }


  verMensaje(mensaje:any){
    this.sms=mensaje.mensaje;
    this._mens.leerMensaje(mensaje.uid);
    document.getElementById('btnMensaje').click();


  }


  cerrarSesion(){
    this._storage.removeLocalStorage();
    this._r.navigateByUrl('/inicio');
  }


  configuracion(){
    this._usu.getUsuario(this.usuario.uid).subscribe(
      resp=>{
        document.getElementById('btnPersonalizacion').click();
      }
    );
  }


  cambiarImagen(){
    document.getElementById('arch').click();
  }


  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      
    }
    this.subirArchivo();
  }


  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    
    
    let tarea = this._fireStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    
    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        this._fireStorage.referenciaCloudStorage(this.nombreArchivo).getDownloadURL().subscribe(
          resp=>{
            this.url=resp;
            this._usu.cambiarImagen(resp,this.usuario.uid);
            this._storage.modificarImagenStorage(resp);
            
          }
        );
      }

    });

    
   }

   guardarCambios(){
     this._usu.cambiarDatos(this.usuNombre,this.usuApellido,this.usuMail, this.usuario.uid);
     this._storage.removeLocalStorage();
     this._r.navigateByUrl('/inicio');

   }

}
