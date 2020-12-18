import { Component, OnInit } from '@angular/core';
import { InformeService } from 'src/app/servicios/informe.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Pendiente', 'En tramite', 'Resuelto', 'Cerrado','Rechazado','Observado'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Burzaco' },
    { data: [0, 0, 0, 0, 0], label: 'Guernica' },
    { data: [0, 0, 0, 0, 0], label: 'Longchamps' }
  ];

  usuario:any={};
  mensaje=false;
  informes=false;
  flecha:string="abajo";
  flechamsn:string="abajo";
  burzaco:number=0;
  guernica:number=0;
  long:number=0;
  pendienteb:number;
  cerradob:number;
  tramiteb:number;
  resueltob:number;
  rechazadob:number;
  observadob:number;
  pendienteg:number;
  cerradog:number;
  tramiteg:number;
  resueltog:number;
  rechazadog:number;
  observadog:number;
  pendientel:number;
  cerradol:number;
  tramitel:number;
  resueltol:number;
  rechazadol:number;
  observadol:number;
 

  constructor(private _storage : StorageService, private _info : InformeService ) { }

  ngOnInit() {


    this.usuario=this._storage.getLocalStorage();



    if(this.usuario.perfil=='adm'){

    
    this._info.getInformesSucursal('Burzaco').subscribe((resp:any[])=>{
    
      this.burzaco= resp.length;
    });
    this._info.getInformesSucursal('Guernica').subscribe((resp:any[])=>{
      
      this.guernica= resp.length;
    });
    this._info.getInformesSucursal('Longchamps').subscribe((resp:any[])=>{
      
      this.long= resp.length;
    });

    this._info.getInformeSucursalEstado("Burzaco").subscribe((resp:any[])=>{
      this.pendienteb=0;
      this.tramiteb=0;
      this.resueltob=0;
      this.cerradob=0;
      this.rechazadob=0;
      this.observadob=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendienteb+=1;
        if(i.estado == "En tramite")this.tramiteb+=1;
        if(i.estado == "Resuelto")this.resueltob+=1;
        if(i.estado == "Cerrado")this.cerradob+=1;
        if(i.estado == "Rechazado")this.rechazadob+=1;
        if(i.estado == "Observado")this.observadob+=1;
      }

      this.barChartData = [
        { data: [this.pendienteb, this.tramiteb, this.resueltob, this.cerradob], label: 'Burzaco' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica' },
        { data: [0, 0, 0, 0, 0], label: 'Longchamps' }
      ];

    });

    this._info.getInformeSucursalEstado("Guernica").subscribe((resp:any[])=>{
      this.pendienteg=0;
      this.tramiteg=0;
      this.resueltog=0;
      this.cerradog=0;
      this.rechazadog=0;
      this.observadog=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendienteg+=1;
        if(i.estado == "En tramite")this.tramiteg+=1;
        if(i.estado == "Resuelto")this.resueltog+=1;
        if(i.estado == "Cerrado")this.cerradog+=1;
        if(i.estado == "Rechazado")this.rechazadog+=1;
        if(i.estado == "Observado")this.observadog+=1;
      }

      this.barChartData = [
        { data: [this.pendienteb, this.tramiteb, this.resueltob, this.cerradob, this.rechazadob], label: 'Burzaco' },
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guernica' },
        { data: [0, 0, 0, ,0, 0], label: 'Longchamps' }
      ];

    });



    this._info.getInformeSucursalEstado("Longchamps").subscribe((resp:any[])=>{
      this.pendientel=0;
      this.tramitel=0;
      this.resueltol=0;
      this.cerradol=0;
      this.rechazadol=0;
      this.rechazadol=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendientel+=1;
        if(i.estado == "En tramite")this.tramitel+=1;
        if(i.estado == "Resuelto")this.resueltol+=1;
        if(i.estado == "Cerrado")this.cerradol+=1;
        if(i.estado == "Rechazado")this.rechazadol+=1;
        if(i.estado == "Observado")this.observadol+=1;
      }

      this.barChartData = [
        { data: [this.pendienteb, this.tramiteb, this.resueltob, this.cerradob, this.rechazadob], label: 'Burzaco' },
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guernica' },
        { data: [this.pendientel, this.tramitel, this.resueltol, this.cerradol, this.rechazadol], label: 'Longchamps' }
      ];

    });
    
    

  }


  }

  mensajes(){
    this.mensaje=true;
  }

  verInformes(){
    this.informes=true;
  }

  test(){
    if(this.flecha=="abajo") this.flecha="arriba"
    else this.flecha="abajo"
  }

  flechaMensaje(){
    if(this.flechamsn=="abajo") this.flechamsn="arriba"
    else this.flechamsn="abajo"
  }
}
