import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private _storage: StorageService, private _r: Router ) { 

  }
  
  
  canActivate() {

    if(this._storage.getLocalStorage())return true;
    else this._r.navigateByUrl('/inicio');
  }
}
