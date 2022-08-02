import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import{Pedido} from '../entidades/Pedido';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import{PedidoDto} from '../entidades/dto/PedidoDto';

@Injectable({
  providedIn: 'root'
})
export class PedidoServicio {


  public pedidosData:Pedido[]=[];
  public pedidoEncontrado:any;
  public idPedido:number=0;

  constructor(public http: HttpClient) {
    console.log("Servicio Cargado!!!");
   }

  public getPedidos():any[]{
    return this.pedidosData;
    console.log(this.pedidosData);
  }

  public getPedidoXId(idx:number):any{
      for(let pedido of this.pedidosData){
          if(pedido.idPedido == idx){
            return pedido;
          }
      }
  }


  //lee todos los pedidos
  getPedidosFromDataBase():Observable<PedidoDto[]>{
    return this.http.get<PedidoDto[]>("http://localhost:8080/pedido/listarPedidos");

  }

  //busca un pedido por el id
  getPedidoEnBaseDatosXId(idx:string){
    return this.http.get("http://localhost:8080/pedido/listarPedidoXId/" + idx).pipe(
      map( pedidoEncontrado => pedidoEncontrado));
  }
  getIdUltimoPedido(){
    return this.http.get("http://localhost:8080/pedido/ultimoPedido/");
  }
  //pedidos por usuario
  getPedidosPorUsuario(fechaDesde:string,fechaHasta:string){
    return this.http.get("http://localhost:8080/pedido/pedidosPorUsuario?fecha1="+fechaDesde+"&fecha2="+fechaHasta).pipe(
      map( pedidosData => pedidosData));
  }

  getPagarPedido(id:number){
    return this.http.get("http://localhost:8080/pedido/pagarPedido/"+id);
  }
  //ranking de pedidos por fechas
  getPedidosPorFechas(fechaDesde:string,fechaHasta:string){
    return this.http.get("http://localhost:8080/pedido/pedidosPorFechas?fecha1="+fechaDesde+"&fecha2="+fechaHasta).pipe(
      map( pedidosData => pedidosData));
  }


    //baja logica de un pedido
     async deletePedidoFetch(idPedido: string){
      let urlServer = 'http://localhost:808/pedido/borrarPedido/'+idPedido;
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

    //guardar o actualizar pedido
    async guardarPOST(pedido:Pedido) {
      let urlServer = 'http://localhost:8080/pedido/crearPedido';
      let method = "POST";
      if(pedido && pedido.idPedido > 0){
        urlServer = 'http://localhost:8080/pedido/modificarPedido';
        method = "PUT";
      }
      return await fetch(urlServer, {
        "method": method,
        "body": JSON.stringify(pedido),
        "headers": {
        "Content-Type": 'application/json'
        }
      });

    }

    getPedidosPorUsuarioFromDataBase(nombreUsuario:any):Observable<PedidoDto[]>{
      return this.http.get<PedidoDto[]>("http://localhost:8080/pedido/listarPedidosPorUsuario?nombreUsuario="+nombreUsuario);

    }






}
