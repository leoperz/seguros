import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { InformeService } from 'src/app/servicios/informe.service';



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = [ ['Pendiente'], ['En tramite'], ['Resuelto'], ['Rechazado'],['Observado'],'Cerrado'];
  public pieChartData: number[] = [0 , 0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(0,255,255,0.3)','rgba(255,255,0)','rgba(254,0,0)' ],
    },
  ];

  perfilCambio:boolean=false;
  sucursalCambio:boolean=false;
  perfil:string="";
  sucursal:string="";
  operador:any={};
  cerrados:any[]=[];
  resueltos:any[]=[];
  tramites:any[]=[];
  pendientes:any[]=[];
  rechazados:any[]=[];
  observados:any[]=[];
  
  constructor(private _repo: ReportesService, private _usu: UsuarioService, private _info : InformeService) { }

  ngOnInit() {
    
    this.operador=this._repo.getOperador();
    this.sucursal=this.operador.sucursal;
    this.perfil = this.operador.perfil;
    
    this._info.estadisticaInforme(this.operador.uid,'Cerrado').subscribe(resp=>{
      this.cerrados=[];
      for(let i of resp){
        this.cerrados.push(i);
      }
      this.pieChartData=[this.pendientes.length,this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
    
    });

    this._info.estadisticaInforme(this.operador.uid,'Resuelto').subscribe(resp=>{
      this.resueltos=[];
      for(let i of resp){
        this.resueltos.push(i);
      }
      this.pieChartData=[this.pendientes.length,this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
       });


    this._info.estadisticaInforme(this.operador.uid,'En tramite').subscribe(resp=>{
      this.tramites=[];
      for(let i of resp){
        this.tramites.push(i);
      }
      this.pieChartData=[this.pendientes.length,this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
      
     
    });
    this._info.estadisticaInforme(this.operador.uid,'Observado').subscribe(resp=>{
      this.tramites=[];
      for(let i of resp){
        this.tramites.push(i);
      }
      this.pieChartData=[this.pendientes.length,this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
      
     
    });

    this._info.estadisticaInforme(this.operador.uid,'Rechazado').subscribe(resp=>{
      this.tramites=[];
      for(let i of resp){
        this.tramites.push(i);
      }
      this.pieChartData=[this.pendientes.length,this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
      
     
    });

    this._info.estadisticaInforme(this.operador.uid,'Pendiente').subscribe(resp=>{
      this.pendientes=[];
      for(let i of resp){
        this.pendientes.push(i);
      }
      this.pieChartData=[this.pendientes.length,this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
    });

    setTimeout(() => {
      this.pieChartData=[ this.pendientes.length, this.tramites.length, this.resueltos.length, this.cerrados.length,this.observados.length, this.rechazados.length]
    }, 3000);


  }


  cambiarEstado(item:any){
    this.sucursal=item;
    
  }


  cambiarEstadoPerfil(item:any){
    this.perfil=item;
  }


  actualizarSucursal(){
    this.sucursalCambio=true;
    this._usu.actualizarSucursal(this.operador.uid, this.sucursal)
    setTimeout(() => {
      this.sucursalCambio=false;
    }, 5000);
  }

  actualizarPerfil(){
    this.perfilCambio=true;
    let flag;
    if(this.perfil=="Administrador")flag="adm";
    else flag = "operador";
    this._usu.actualizarPerfil(this.operador.uid, flag);



    setTimeout(() => {
      this.perfilCambio=false;
    }, 5000);
  }

  

 
  

}
