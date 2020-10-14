import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};

  constructor() { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Sucursal Burzaco' },
      { item_id: 2, item_text: 'Sucursal Guernica' },
      { item_id: 3, item_text: 'Sucursal Longchamps' },
      { item_id: 4, item_text: 'Estudio de abogados' }
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

  getSucursal(sucu:any){
   

    
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
