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
    { data: [0, 0, 0, 0, 0], label: 'Guillon' },
    { data: [0, 0, 0, 0, 0], label: 'Guernica1' },
    { data: [0, 0, 0, 0, 0], label: 'Guernica2' },
    { data: [0, 0, 0, 0, 0], label: 'Guernica3' },
    { data: [0, 0, 0, 0, 0], label: 'Longchamps' },
    { data: [0, 0, 0, 0, 0], label: 'Mercado central' }
  ];

  usuario:any={};
  mensaje=false;
  informes=false;
  flecha:string="abajo";
  flechamsn:string="abajo";
  guillon:number=0;
  guernica1:number=0;
  guernica2:number=0;
  guernica3:number=0;
  mercado:number=0;
  long:number=0;
  pendienteg:number;
  cerradog:number;
  tramiteg:number;
  resueltog:number;
  rechazadog:number;
  observadog:number;
  pendienteg1:number;
  cerradog1:number;
  tramiteg1:number;
  resueltog1:number;
  rechazadog1:number;
  observadog1:number;
  pendienteg2:number;
  cerradog2:number;
  tramiteg2:number;
  resueltog2:number;
  rechazadog2:number;
  observadog2:number;
  pendienteg3:number;
  cerradog3:number;
  tramiteg3:number;
  resueltog3:number;
  rechazadog3:number;
  observadog3:number;
  pendientel:number;
  cerradol:number;
  tramitel:number;
  resueltol:number;
  rechazadol:number;
  observadol:number;
  pendientem:number;
  cerradom:number;
  tramitem:number;
  resueltom:number;
  rechazadom:number;
  observadom:number;
 

  constructor(private _storage : StorageService, private _info : InformeService ) { }

  ngOnInit() {


    this.usuario=this._storage.getLocalStorage();



    if(this.usuario.perfil=='adm'){

    
    this._info.getInformesSucursal('Guillon').subscribe((resp:any[])=>{
    
      this.guillon= resp.length;
    });
    this._info.getInformesSucursal('Guernica1').subscribe((resp:any[])=>{
      
      this.guernica1= resp.length;
    });
    this._info.getInformesSucursal('Guernica2').subscribe((resp:any[])=>{
      
      this.guernica2= resp.length;
    });
    this._info.getInformesSucursal('Guernica3').subscribe((resp:any[])=>{
      
      this.guernica3= resp.length;
    });
    this._info.getInformesSucursal('Longchamps').subscribe((resp:any[])=>{
      
      this.long= resp.length;
    });

    this._info.getInformesSucursal('Mercado central').subscribe((resp:any[])=>{
      
      this.mercado= resp.length;
    });

    this._info.getInformeSucursalEstado("Guillon").subscribe((resp:any[])=>{
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
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog], label: 'Guillon' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica1' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica2' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica3' },
        { data: [0, 0, 0, 0, 0], label: 'Longchamps' },
        { data: [0, 0, 0, 0, 0], label: 'Mercado central' },
      ];

    });

    this._info.getInformeSucursalEstado("Guernica1").subscribe((resp:any[])=>{
      this.pendienteg1=0;
      this.tramiteg1=0;
      this.resueltog1=0;
      this.cerradog1=0;
      this.rechazadog1=0;
      this.observadog1=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendienteg1+=1;
        if(i.estado == "En tramite")this.tramiteg1+=1;
        if(i.estado == "Resuelto")this.resueltog1+=1;
        if(i.estado == "Cerrado")this.cerradog1+=1;
        if(i.estado == "Rechazado")this.rechazadog1+=1;
        if(i.estado == "Observado")this.observadog1+=1;
      }

      this.barChartData = [
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guillon' },
        { data: [this.pendienteg1, this.tramiteg1, this.resueltog1, this.cerradog1, this.rechazadog1], label: 'Guernica1' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica2' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica3' },
        { data: [0, 0, 0, ,0, 0], label: 'Longchamps' },
        { data: [0, 0, 0, ,0, 0], label: 'Mercado central' },

      ];

    });

    this._info.getInformeSucursalEstado("Guernica2").subscribe((resp:any[])=>{
      this.pendienteg2=0;
      this.tramiteg2=0;
      this.resueltog2=0;
      this.cerradog2=0;
      this.rechazadog2=0;
      this.observadog2=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendienteg2+=1;
        if(i.estado == "En tramite")this.tramiteg2+=1;
        if(i.estado == "Resuelto")this.resueltog2+=1;
        if(i.estado == "Cerrado")this.cerradog2+=1;
        if(i.estado == "Rechazado")this.rechazadog2+=1;
        if(i.estado == "Observado")this.observadog2+=1;
      }

      this.barChartData = [
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guillon' },
        { data: [this.pendienteg1, this.tramiteg1, this.resueltog1, this.cerradog1, this.rechazadog1], label: 'Guernica1' },
        { data: [this.pendienteg2, this.tramiteg2, this.resueltog2, this.cerradog2, this.rechazadog2], label: 'Guernica2' },
        { data: [0, 0, 0, 0, 0], label: 'Guernica3' },
        { data: [0, 0, 0, ,0, 0], label: 'Longchamps' },
        { data: [0, 0, 0, ,0, 0], label: 'Mercado central' },

      ];

    });


    this._info.getInformeSucursalEstado("Guernica3").subscribe((resp:any[])=>{
      this.pendienteg3=0;
      this.tramiteg3=0;
      this.resueltog3=0;
      this.cerradog3=0;
      this.rechazadog3=0;
      this.observadog3=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendienteg3+=1;
        if(i.estado == "En tramite")this.tramiteg3+=1;
        if(i.estado == "Resuelto")this.resueltog3+=1;
        if(i.estado == "Cerrado")this.cerradog3+=1;
        if(i.estado == "Rechazado")this.rechazadog3+=1;
        if(i.estado == "Observado")this.observadog3+=1;
      }

      this.barChartData = [
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guillon' },
        { data: [this.pendienteg1, this.tramiteg1, this.resueltog1, this.cerradog1, this.rechazadog1], label: 'Guernica1' },
        { data: [this.pendienteg2, this.tramiteg2, this.resueltog2, this.cerradog2, this.rechazadog2], label: 'Guernica2' },
        { data: [this.pendienteg3, this.tramiteg3, this.resueltog3, this.cerradog3, this.rechazadog3], label: 'Guernica3' },
        { data: [0, 0, 0, ,0, 0], label: 'Longchamps' },
        { data: [0, 0, 0, ,0, 0], label: 'Mercado central' },

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
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guillon' },
        { data: [this.pendienteg1, this.tramiteg1, this.resueltog1, this.cerradog1, this.rechazadog1], label: 'Guernica1' },
        { data: [this.pendienteg2, this.tramiteg2, this.resueltog2, this.cerradog2, this.rechazadog2], label: 'Guernica2' },
        { data: [this.pendienteg3, this.tramiteg3, this.resueltog3, this.cerradog3, this.rechazadog3], label: 'Guernica3' },
        { data: [this.pendientel, this.tramitel, this.resueltol, this.cerradol, this.rechazadol], label: 'Longchamps' },
        { data: [0, 0, 0, ,0, 0], label: 'Mercado central' },

      ];

    });
    
    
    this._info.getInformeSucursalEstado("Mercado central").subscribe((resp:any[])=>{
      this.pendientem=0;
      this.tramitem=0;
      this.resueltom=0;
      this.cerradom=0;
      this.rechazadom=0;
      this.rechazadom=0;
      
      for(let  i of resp){
        if (i.estado == "Pendiente")this.pendientem+=1;
        if(i.estado == "En tramite")this.tramitem+=1;
        if(i.estado == "Resuelto")this.resueltom+=1;
        if(i.estado == "Cerrado")this.cerradom+=1;
        if(i.estado == "Rechazado")this.rechazadom+=1;
        if(i.estado == "Observado")this.observadom+=1;
      }

      this.barChartData = [
        { data: [this.pendienteg, this.tramiteg, this.resueltog, this.cerradog, this.rechazadog], label: 'Guillon' },
        { data: [this.pendienteg1, this.tramiteg1, this.resueltog1, this.cerradog1, this.rechazadog1], label: 'Guernica1' },
        { data: [this.pendienteg2, this.tramiteg2, this.resueltog2, this.cerradog2, this.rechazadog2], label: 'Guernica2' },
        { data: [this.pendienteg3, this.tramiteg3, this.resueltog3, this.cerradog3, this.rechazadog3], label: 'Guernica3' },
        { data: [this.pendientel, this.tramitel, this.resueltol, this.cerradol, this.rechazadol], label: 'Longchamps' },
        { data: [this.pendientem, this.tramitem, this.resueltom, this.cerradom, this.rechazadom], label: 'Mercado central' },

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
