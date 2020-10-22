import { Component } from '@angular/core';
import { StorageService } from './servicios/storage.service';
import {Router} from '@angular/router'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seguros';
  usuario:any={};
  constructor(private _storage: StorageService, private _r: Router){
    this.usuario=this._storage.getLocalStorage();
    if(this.usuario){
      this._r.navigateByUrl('/dashboard');
    }
  }

}
