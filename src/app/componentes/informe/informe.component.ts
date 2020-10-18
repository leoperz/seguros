import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent  {
  
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public nombresArch:any[] =[];
  public porcentaje = 0;
  public finalizado = false;
  public nombresURL:any[]=[];
  compania="";
  nombreCompleto="";
  apellido="";
  documento="";
  dominio="";
  modelo="";
  marca="";
  telefono="";
  domicilio="";

  referencia:any;

  constructor(private _fireStorage: FirestorageService, private _infor :InformeService, private _stor : StorageService) { }

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });


  public cambioArchivo(event) {
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
    
    
    let tarea = this._fireStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    
    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        this.nombresArch.push(this.nombreArchivo);
      }

    });

    
   }

  
   getUrls(){
     
     this.nombresURL=[];
     for(let i of this.nombresArch){
      this._fireStorage.referenciaCloudStorage(i).getDownloadURL().subscribe(resp=>{
         
      
          
          this.nombresURL.push(resp);
        
        
      });
     }
    console.log(this.nombresURL);
   }
    

   explorador(){
     document.getElementById('file').click();
   }

   cancelar(){
     this.nombresURL=[];
   }
    
    
    altaSiniestro(){
      
      console.log();
      let payload={
        
        fechaAlta : (document.getElementById('my-input') as HTMLInputElement).value,
        compania: this.compania,
        nombreCompleto:this.nombreCompleto,
        apellido:this.apellido,
        documento:this.documento,
        dominio:this.dominio,
        modelo:this.modelo,
        marca:this.marca,
        importe: (document.getElementById('importe') as HTMLInputElement).value,
        telefono:this.telefono,
        domicilio:this.domicilio,
        archivos:this.nombresURL,
        usuario:this._stor.getLocalStorage()
      }

      console.log(payload);
      
      this._infor.guardarInforme(payload).then(resp=>{
        (document.getElementById('my-input') as HTMLInputElement).value="";
        (document.getElementById('importe') as HTMLInputElement).value="$ 0,00";
        this.compania="";
        this.nombreCompleto="";
        this.apellido="";
        this.documento="";
        this.dominio="";
        this.modelo="";
        this.marca="";
        this.telefono="";
        this.domicilio="";
        this.nombresURL=[];
        this.nombresArch =[];
        document.getElementById('btnMensajeFormulario').click();
      });
    }

    
  


}