import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(private _firestore: AngularFirestore) { }


 
  getInformeSucursalEstado(sucursal:string){
    return this._firestore.collection('informe', resp=>resp.where('usuario.sucursal','==',sucursal)).valueChanges();
  }


  getInformesSucursal(sucursal:string){
    return this._firestore.collection('informe', resp=>resp.where('usuario.sucursal','==',sucursal )).valueChanges();
  }

  getInformes(){
    return this._firestore.collection('informe', resp=>resp.orderBy('fechaAlta')).valueChanges();
  }

  getInforme(uid:string){
    return this._firestore.collection('informe').doc(uid).valueChanges();
  }

  guardarInforme(payload:any){
    this._firestore.collection('informe').add(payload).then(resp=>{
      this._firestore.collection('informe').doc(resp.id).update({
        uid:resp.id
      });
    })
  }

  buscarInforme(desde:any, hasta:any){
    return this._firestore.collection('informe', resp=>resp.orderBy('fechaAlta').startAt(desde).endAt(hasta)).valueChanges();
  }


  updateEstado(value:string, uid:string){
    return this._firestore.collection('informe').doc(uid).update({
      estado:value
    });
  }


  updateEstado2(value:string, uid:string){
    this._firestore.collection('informe').doc(uid).update({
      estado:"Liquidado",
      indemnizacion:value
    });
  }

  delete(uid:string){
    this._firestore.collection('informe').doc(uid).delete().then();
  }

  estadisticaInforme(uid:string, estado:string){
   return this._firestore.collection('informe', resp=>resp.where("usuario.uid" ,'==', uid).where("estado","==",estado)).valueChanges();
  }


  
guardarNotas(uid:string, payload:any){
  this._firestore.collection('informe').doc(uid).update({
    notas:payload
  });
}


  getNotas(uid:string){
    let array=[];
    this._firestore.collection('informe').doc(uid).valueChanges().subscribe((data:any)=>{
      for(let i of data){
        array.push(i);
      }

    });
    return array;
  }


  actualizarArchivos(archivos:any[],uid:string){
    
    this._firestore.collection('informe').doc(uid).update({
      archivos:archivos
    });
  }

  actualizarInforme(payload:any,uid:string){
    this._firestore.collection('informe').doc(uid).update({
      anio:payload.anio,
      apellido:payload.apellido,
      compania:payload.compania,
      companiaAseguradora:payload.companiaAseguradora,
      documento:payload.documento,
      domicilio:payload.domicilio,
      dominio:payload.dominio,
      fechaAlta:payload.fechaAlta,
      importe:payload.importe,
      mail:payload.mail,
      marca:payload.marca,
      modelo:payload.modelo,
      nombreCompleto:payload.nombreCompleto,
      telefono:payload.telefono
    });
  }
    
    
  }





