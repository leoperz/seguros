import {Component, Injectable} from '@angular/core';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';
import * as moment from 'moment';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import * as  jszip from 'jszip'; 








@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css'],
  providers: []
})



export class InformeComponent  {
  
  zipp = new jszip();
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public nombresArch:any[] =[];
  public porcentaje = 0;
  public finalizado = false;
  public nombresURL:any[]=[];
  public informeForm: FormGroup;
  compania="";
  nombreCompleto="";
  apellido="";
  documento="";
  dominio="";
  modelo="";
  marca="";
  anio="";
  telefono="";
  mail="";
  companiaAseguradora="";
  domicilio="";
  test="";
  ancho =0;
  list:any[]=[]; 
  cargando=false;
  

  referencia:any;

  constructor(private _fireStorage: FirestorageService, private _infor :InformeService, 
              private _stor : StorageService,
              private _noti : NotificacionService
              ) {
                this.informeForm = this.createInformeForm();
               }


  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  

  createInformeForm() {
         return  new FormGroup({
          fechaAlta: new FormControl(null, [Validators.required]),
          compania: new FormControl(null, [Validators.required]),
          telefono: new FormControl(null, [Validators.required]),
          mail: new FormControl(null, [Validators.required]),
          companiaAseguradora: new FormControl(null, [Validators.required]),
          domicilio: new FormControl('', [Validators.required]),
          marca:  new FormControl('', [Validators.required]),
          anio:  new FormControl('', [Validators.required]),
          modelo: new FormControl('', [Validators.required]),
          dominio: new FormControl('', [Validators.required]),
          nombreCompleto: new FormControl('', [Validators.required, Validators.minLength(5)]),
          apellido: new FormControl('', [Validators.required]),
          documento: new FormControl('', [Validators.required, Validators.min(9999999),Validators.max(99999999)]),
          importe: new FormControl('', [Validators.required])
        });       
  }

  onResetForm(): void {
    this.informeForm.reset();
  }


  public cambioArchivo(event) {
  
    this.ancho=100;

    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
    this.subirArchivo();
  }





  public subirArchivo() {
    
    
    
    let archivo = this.datosFormulario.get('archivo');
    
    //probando el .zip
    
    this.list.push({
      nombre:this.nombreArchivo,
      arch: archivo
    });

 

    
   
    
    
    



    //probando el .zip
    
    
    //let tarea = this._fireStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    
    //Cambia el porcentaje
    /*tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      this.ancho = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        this.nombresArch.push(this.nombreArchivo);
      }

    });*/
    

    setTimeout(() => {
      this.ancho=0;
    }, 3000);
}

  
   getUrls(){
    if(this.list.length > 0){
      this.cargando=true;
    for(let i of this.list){
      this.zipp.file(i.nombre,i.arch);
    }
    
    let nombre = "documentos"+moment().format('hh-mm-ss')+".zip";
    this.nombresArch.push(nombre);
    
    this.zipp.generateAsync({type:"blob"}).then((data)=>{
    let tarea = this._fireStorage.tareaCloudStorage(nombre, data);
    tarea.percentageChanges().subscribe(data=>{
      if(Math.round(data)==100){
        this.nombresURL=[];
        setTimeout(() => {
          for(let i of this.nombresArch){
            
            this._fireStorage.referenciaCloudStorage(i).getDownloadURL().subscribe(resp=>{
            this.nombresURL.push(resp);
              });
           }
           
           document.getElementById('cerrarModal').click();
           this.cargando=false;
        }, 3000);
      
       
      }
    });
  
    });
    }
    
    
  }
    

   explorador(){
     document.getElementById('file').click();
   }

   cancelar(){
     this.ancho=0;
     this.nombresURL=[];
     this.list=[];
   }
    
    
    altaSiniestro(){
      //validar que los campos esten en la condicion requerida;

      


      //validar que los campos esten en la condicion requerida;
    
      let f = this.test.split('-');
      let payload={
        
        fechaAlta : f[2]+"/"+f[1]+"/"+f[0],
        fechaCierre:"",
        compania: this.compania,
        nombreCompleto:this.nombreCompleto,
        apellido:this.apellido,
        documento:this.documento,
        dominio:this.dominio,
        modelo:this.modelo,
        marca:this.marca,
        anio:this.anio,
        importe: (document.getElementById('importe') as HTMLInputElement).value,
        telefono:this.telefono,
        mail:this.mail,
        companiaAseguradora:this.companiaAseguradora,
        domicilio:this.domicilio,
        archivos:this.nombresURL,
        usuario:this._stor.getLocalStorage(),
        indemnizacion:"",
        estado:"Pendiente",
        notas:[]
      }


      console.log(payload);
      
      if (this.informeForm.valid){
        this._infor.guardarInforme(payload);
        (document.getElementById('my-input') as HTMLInputElement).value="";
        (document.getElementById('importe') as HTMLInputElement).value="$ 0,00";
        this.compania="";
        this.nombreCompleto="";
        this.apellido="";
        this.documento="";
        this.dominio="";
        this.modelo="";
        this.marca="";
        this.anio="";
        this.telefono="";
        this.mail="";
        this.companiaAseguradora="";
        this.domicilio="";
        this.nombresURL=[];
        this.nombresArch =[];
        this.ancho=0;
        document.getElementById('btnMensajeFormulario').click();
      
      let variable ={
        motivo:"Se ha generado un nuevo informe",
        sucursal:payload.usuario.sucursal,
        fecha: moment().format('DD/MM/yyyy')
      }
      this._noti.guardarNotificacion(variable);

      this.onResetForm();
    } else{
      console.log("Error en el alta de informe");
    }
    
    }

        get Compania() { return this.informeForm.get('compania'); }
        get nombre() { return this.informeForm.get('nombreCompleto'); }
        get Documento() { return this.informeForm.get('documento'); }
        get Apellido() { return this.informeForm.get('apellido'); }
        get Telefono() { return this.informeForm.get('telefono'); }
        get Mail() { return this.informeForm.get('mail'); }
        get CompaniaAseguradora() { return this.informeForm.get('companiaAseguradora'); }
        get Dominio() { return this.informeForm.get('dominio'); }
        get Modelo() { return this.informeForm.get('modelo'); }
        get Marca() { return this.informeForm.get('marca'); }
        get Anio() { return this.informeForm.get('anio'); }
        get Domicilio() { return this.informeForm.get('domicilio'); }
        get FechaAlta() { return this.informeForm.get('fechaAlta'); }
        get Importe() { return this.informeForm.get('importe'); }
        


    mayusDominio(value){
      this.dominio = value.toUpperCase();
    }

    mayusMarca(value){
      this.marca = value.toUpperCase();
    }

    mayusModelo(value){
      this.modelo = value.toUpperCase();
    }

    mayusApellido(value){
      this.apellido = value.toUpperCase();
    }
    mayusNombreCompleto(value){
      this.nombreCompleto = value.toUpperCase();
    }
    mayusDomicilio(value){
      this.domicilio = value.toUpperCase();
    }
    mayusCompania(value){
      this.compania = value.toUpperCase();
    }
    mayusCompaniaAseguradora(value){
      this.companiaAseguradora = value.toUpperCase();
    }
    
 }