import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  
  finalArray:any[]=[];
  busqueda:string="";
  flag=false;
  usuarios:any[]=[];
  constructor( private _usuario: UsuarioService) { }

  ngOnInit() {
    document.getElementById('agenda').click();
    this._usuario.getUsuarios().subscribe(
      resp=>{
        for(let i of resp){
          this.usuarios.push(i);
          this.finalArray.push(i);
        }
       
      }
    );
  }


buscar(){
  if(this.busqueda!="")this.flag=true;
  this.finalArray=[];
  console.log(this.busqueda);
  let nombre="";
  for(let i of this.usuarios){
    nombre = (i.nombre+ " " +i.apellido).toLowerCase();
    console.log(nombre);
    if(nombre.includes((this.busqueda).toLowerCase())) this.finalArray.push(i);
    
    
  }
 
console.log(this.finalArray);

  

}

}