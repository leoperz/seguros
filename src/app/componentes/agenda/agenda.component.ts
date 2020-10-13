import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  usuarios:any[]=[];
  constructor( private _usuario: UsuarioService) { }

  ngOnInit() {
    document.getElementById('agenda').click();
    this._usuario.getUsuarios().subscribe(
      resp=>{
        console.log(resp);
        this.usuarios = resp
      }
    );
  }

}
