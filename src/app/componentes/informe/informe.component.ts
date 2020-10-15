import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/servicios/firestorage.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {
  status=0;
  filesToUpload: Array<File>;
  width=0;
  url="";
  constructor(private _fireStorage: FirestorageService) { }

  ngOnInit() {
  }

  subirDocumento(fileInput:any){
    this.status=0;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if(this.filesToUpload){
      
      this.makeFileRequest( [], this.filesToUpload)
     
    }
  }

  makeFileRequest( params: Array<string>, files:Array<File>){
    
    let formData:any = new FormData();
    
    for(let i = 0 ; i < files.length; i++){
      formData.append('image', files[i], files[i].name);
      
    }
    
    let archivo = formData.get('image');
    

    
    
    
    this._fireStorage.subirArchivo(archivo.name, archivo).percentageChanges().subscribe(percent=>{
      this.width=Math.round(percent);
      
      
      if(this.width==100){
        let referencia=this._fireStorage.referenciaCloudStorage(archivo.name);
        referencia.getDownloadURL().subscribe(
          result=>{
            this.url=result;
            this.status=1;
            
          }
        );
      }
    })
    
    


    
    
    
    
    }

}
