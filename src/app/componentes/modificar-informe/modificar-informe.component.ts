import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-informe',
  templateUrl: './modificar-informe.component.html',
  styleUrls: ['./modificar-informe.component.css']
})
export class ModificarInformeComponent implements OnInit {

  p:number=1;
  page:number=5;
  informes:any[]=[];
  usuario:any={};
  flag:any="";
  reclamante:any={};
  imagenes:any[]=[];
  informe:any={};
  btnAgregar:string = "";
  nombreArchivo:any;
  deleted=[];
  array:any[]=[];
  datosFormulario = new FormData();
  registerForm: FormGroup;
  fechaAlta:any;
  compania:any;
  nombreCompleto:any;
  apellido:any;
  documento:any;
  telefono: any;
  mail:any;
  companiaAseguradora:any;
  domicilio:any;
  dominio:any;
  marca:any;
  modelo:any;
  anio:any;




  constructor(private _info:InformeService,private _stor :StorageService, private _fireStorage: FirestorageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      fechaAlta: ['', Validators.required],
      compania:['', Validators.required],
      nombreCompleto:['', Validators.required],
      apellido:['', Validators.required],
      documento:['', Validators.required],
      telefono:['', Validators.required],
      mail:['', Validators.required],
      companiaAseguradora:['', Validators.required],
      domicilio:['', Validators.required],
      dominio:['', Validators.required],
      marca:['', Validators.required],
      modelo:['', Validators.required],
      anio:['', Validators.required]
      
    });
   

    this.usuario = this._stor.getLocalStorage();
    if(this.usuario.perfil == "abogado" || this.usuario.perfil == "adm"){
      this._info.getInformes().subscribe((resp:any)=>{
        this.informes=[];
        for(let u of resp){
          if(u.estado == "Pendiente" || u.estado=="Observado") this.informes.push(u);
        }
      });
    }
    if(this.usuario.perfil=="operador"){
      this._info.getInformesSucursal(this.usuario.sucursal).subscribe(
        (resp:any)=>{
          
          this.informes=[];
          for(let i of resp){
            if(i.estado == "Pendiente" || i.estado=="Observado")this.informes.push(i);
          }
          
        }
      );
    }
    
  }

  get f() { return this.registerForm.controls; }

  modificarItem(item:any){
      this.btnAgregar=item.uid;
      this._info.getInforme(item.uid).subscribe((resp:any)=>{
      //cargo los  campos del informe
      this.fechaAlta=resp.fechaAlta;
      this.compania=resp.compania;
      this.nombreCompleto=resp.nombreCompleto;
      this.apellido = resp.apellido;
      this.documento = resp.documento;
      this.telefono = resp.telefono;
      this.mail = resp.mail;
      this.companiaAseguradora = resp.companiaAseguradora;
      this.domicilio = resp.domicilio;
      this.dominio =resp.dominio;
      this.modelo = resp.modelo;
      this.marca = resp.marca;
      this.anio = resp.anio;

      console.log("fechaAlta-->",this.fechaAlta);
      this.imagenes=[];
      let nombre;
      let extension;
      let payload;
      for(let e of resp.archivos){
        nombre= e.slice(  e.indexOf('o/') +2,  e.indexOf('?alt'));
        extension = (nombre.split('.'))[1];
        payload={imagen:e,nombre:nombre,extension:extension,uid:item.uid};
        this.imagenes.push(payload);
      }
    });
    
    
    
  }


  borrarImagen(item:any){
   
    
    this.array=[];
    for(let i of this.imagenes){
      if(i.imagen != item.imagen){
        this.array.push(i.imagen);
      }else{
        this.deleted.push(i.imagen);
      }
    }
    
    this._info.actualizarArchivos(this.array,item.uid);
    
  }





  explorador(){
    
    document.getElementById('file').click();
  }

  cambioArchivo(event:any){
    if(event.target.files.length > 0){
      for (let i = 0; i < event.target.files.length; i++) {
        
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
      this.subirArchivo();
    }
  }

  private subirArchivo(){
    let auxiliar=[];
    this._info.getInforme(this.btnAgregar).subscribe(
      (resp:any)=>{auxiliar=resp.archivos}
    );
    let archivo = this.datosFormulario.get('archivo');
    let tarea = this._fireStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    tarea.then(data=>{
      if(data){
        this._fireStorage.referenciaCloudStorage(this.nombreArchivo).getDownloadURL().subscribe(resp=>{
        auxiliar.push(resp);
        
        console.log("auxiliar-->",auxiliar);
        this._info.actualizarArchivos(auxiliar,this.btnAgregar);  
          
        });
      }
    });
  }


}
