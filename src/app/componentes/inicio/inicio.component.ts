import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario:string="";
  pass:string="";
  constructor(private _r : Router) { }

  ngOnInit() {
    document.getElementById('boton').click();
  }


  mostrarDatos(){
    console.log("estos son los datos-->",this.pass, this.usuario);
  }

  registrarse(){
    this._r.navigateByUrl('/registrarse')
  }

}
