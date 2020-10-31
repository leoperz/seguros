import {Component, Injectable} from '@angular/core';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';
import * as moment from 'moment';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import {NgbDateStruct, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})



export class InformeComponent  {
  
  model: NgbDateStruct;
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
  telefono="";
  domicilio="";
  

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
          //fechaAlta: new FormControl(null, [Validators.required]),
          compania: new FormControl(null, [Validators.required]),
          date: new FormControl('', [Validators.required]),
          telefono: new FormControl(null, [Validators.required]),
          domicilio: new FormControl('', [Validators.required]),
          marca:  new FormControl('', [Validators.required]),
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
      //validar que los campos esten en la condicion requerida;

      


      //validar que los campos esten en la condicion requerida;
    
      let payload={
        
        fechaAlta : "",//(document.getElementById('my-input') as HTMLInputElement).value,
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
        usuario:this._stor.getLocalStorage(),
        indemnizacion:"",
        estado:"Pendiente"
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
        this.telefono="";
        this.domicilio="";
        this.nombresURL=[];
        this.nombresArch =[];
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
        get Dominio() { return this.informeForm.get('dominio'); }
        get Modelo() { return this.informeForm.get('modelo'); }
        get Marca() { return this.informeForm.get('marca'); }
        get Domicilio() { return this.informeForm.get('domicilio'); }
        get Date() { return this.informeForm.get('date'); }
        get Importe() { return this.informeForm.get('importe'); }


    mayusDominio(value){
      this.dominio = value.toUpperCase();
    }

    mayusMarca(value){
      this.marca = value.toUpperCase();
    }

    
 }