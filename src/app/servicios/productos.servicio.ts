import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import{ArticuloManufacturado} from '../entidades/ArticuloManufacturado';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosServicio {


  public articulosData:ArticuloManufacturado[]=[];
  public articuloEncontrado:any;

  constructor(public http: HttpClient) {
    console.log("Servicio Cargado!!!");
   }

  public getArticulosManufacturados():any[]{
    return this.articulosData;
    console.log(this.articulosData);
  }

  public getArticuloManufacturadoXId(idx:number):any{
      for(let articulo of this.articulosData){
          if(articulo.idArticuloManufacturado == idx){
            return articulo;
          }
      }
  }


  //lee todos los articulos Manufacturados
  getArticulosManufacturadosFromDataBase():Observable<ArticuloManufacturado[]>{
    return this.http.get<ArticuloManufacturado[]>("http://localhost:8080/articuloManufacturado/listarArticuloManufacturados");
  }

  //busca un articulo Manufacturado por el id
  getArticuloManufacturadoEnBaseDatosXId(idx:string){
    return this.http.get("http://localhost:8080/articuloManufacturado/listarArticuloManufacturadoXId/" + idx).pipe(
      map( articuloEncontrado => articuloEncontrado));
  }


     //baja logica de un articulo manufacturado
     async deleteArticuloManufacturadoFetch(idArticulo: string){
      let urlServer = 'http://localhost:808/articuloManufacturado/borrarArticuloManufacturado/'+idArticulo;
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

    //guardar o actualizar un articulo Manufacturado
    async guardarPOST(articuloManufacturado:ArticuloManufacturado) {
      let urlServer = 'http://localhost:8080/articuloManufacturado/articuloManufacturado';
      let method = "POST";
      if(articuloManufacturado && articuloManufacturado.idArticuloManufacturado > 0){
        urlServer = 'http://localhost:8080/articuloManufacturado/modificarArticuloManufacturado';
        method = "PUT";
      }
      await fetch(urlServer, {
        "method": method,
        "body": JSON.stringify(articuloManufacturado),
        "headers": {
        "Content-Type": 'application/json'
        }
      });

    }



}
