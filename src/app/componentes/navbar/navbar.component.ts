import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url = '../../../assets/imagenes/sinfoto.png';
  usuario:any={};
  constructor(private _storage: StorageService) { }

  ngOnInit() {
    this.usuario = this._storage.getLocalStorage();
    if(this.usuario.imagen !=''){

    }
      
  }

}
