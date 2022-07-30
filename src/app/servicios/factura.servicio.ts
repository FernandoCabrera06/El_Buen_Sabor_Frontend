import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import{Factura} from '../entidades/Factura';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturaServicio {


  public facturasData:Factura[]=[];
  public facturaEncontrada:any;

  constructor(public http: HttpClient) {
    console.log("Servicio Cargado!!!");
   }

  public getFacturas():any[]{
    return this.facturasData;
    console.log(this.facturasData);
  }

  public getFacturaXId(idx:number):any{
      for(let factura of this.facturasData){
          if(factura.idFactura == idx){
            return factura;
          }
      }
  }


  //lee todos las facturas
  getFacturasFromDataBase():any{
    return this.http.get("http://localhost:8080/factura/listarFacturas").pipe(
      map( facturasData => facturasData));
  }

  //busca una factura por el id
  getFacturaEnBaseDatosXId(idx:string){
    return this.http.get("http://localhost:8080/factura/listarFacturaXId/" + idx).pipe(
      map( facturaEncontrada => facturaEncontrada));
  }

  //ingresos por periodo
  getIngresosPorPeriodo(fechaDesde:string,fechaHasta:string){
    return this.http.get("http://localhost:8080/factura/ingresosPorPeriodo?fecha1="+fechaDesde+"&fecha2="+fechaHasta)

  }

  //ganancia por periodos
  getGananciaPorPeriodo(fechaDesde:string,fechaHasta:string){
    return this.http.get("http://localhost:8080/factura/gananciaPorPeriodo?fecha1="+fechaDesde+"&fecha2="+fechaHasta).pipe(
      map( facturasData => facturasData));
  }


    //baja logica de una factura
     async deleteFacturaFetch(idFactura: string){
      let urlServer = 'http://localhost:808/factura/borrarFactura/'+idFactura;
      console.log(urlServer);
      let result = await fetch(urlServer, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin':'*'
          },
          mode: 'cors'
      });
    }

    //guardar o actualizar factura
    async guardarPOST(factura:Factura) {
      let urlServer = 'http://localhost:8080/factura/crearFactura';
      let method = "POST";
      if(factura && factura.idFactura > 0){
        urlServer = 'http://localhost:8080/factura/modificarFactura';
        method = "PUT";
      }
      await fetch(urlServer, {
        "method": method,
        "body": JSON.stringify(factura),
        "headers": {
        "Content-Type": 'application/json'
        }
      });

    }



}
