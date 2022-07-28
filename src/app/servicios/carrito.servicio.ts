import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import{Carrito} from '../entidades/dto/CarritoDto';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoServicio{
  carrito: Carrito ={
    id:0,
    nombreProducto: "",
    cantidad: 0,
    precioProducto: 0,
    subTotal:0
  }
  carritos : Carrito[]=[];
  nuevoCarritos: Carrito[]=[];
  private carros: BehaviorSubject<Carrito[]> = new BehaviorSubject<Carrito[]>(this.carritos);

  constructor(private http: HttpClient){}

  public carro$: Observable<Carrito[]> = this.carros.asObservable();

  public setCarrito(carros: Carrito[]): void{
    this.carros.next(carros);
  }
  public resetCarrito(): void{
    localStorage.setItem('carro',JSON.stringify(this.nuevoCarritos));

  }

  async descontarStock() {
    let urlServer = 'http://localhost:8080/articuloManufacturado/descontarStock';
     let method = "PUT";
      await fetch(urlServer, {
      "method": method,
      "body": localStorage.getItem('carro'),
      "headers": {
      "Content-Type": 'application/json'
      }
    });
    alert("en descontarStockPost")


  }

}
