import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario:string="";
  pass:string="";
  constructor() { }

  ngOnInit() {
    document.getElementById('boton').click();
  }


  mostrarDatos(){
    console.log("estos son los datos-->",this.pass, this.usuario);
  }

}
