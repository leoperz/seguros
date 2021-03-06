
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { StorageService } from 'src/app/servicios/storage.service';
import * as moment from 'moment';


@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};
  para:any;
  asunto:any;
  cuerpo:string="";
  constructor(private _storage: StorageService, private _mens: MensajeService) {
    
  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Guillon' },
      { item_id: 2, item_text: 'Guernica1' },
      { item_id: 3, item_text: 'Guernica2' },
      { item_id: 4, item_text: 'Guernica3' },
      { item_id: 5, item_text: 'Longchamps' },
      { item_id: 6, item_text: 'Mercado central' },
      { item_id: 7, item_text: 'Estudio de abogados' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar',
      itemsShowLimit: 4,
      searchPlaceholderText:'Buscar',
      allowSearchFilter: true
    };
  }

 


  enviarMensaje(){
    
    let identity=this._storage.getLocalStorage();
    let array=[];
    for(let i of this.para)array.push(i.item_text);
    
    let payload:any={
      tipo:"general",
      de:identity.uid,
      fecha:moment().format('DD/MM/yyyy'),
      para:array,
      asunto:this.asunto,
      cuerpo:this.cuerpo
    }

    
    
    this._mens.enviarMensaje(payload);
    this.asunto="";
    this.cuerpo="";
    this.para=[];
    
  }

  

}
