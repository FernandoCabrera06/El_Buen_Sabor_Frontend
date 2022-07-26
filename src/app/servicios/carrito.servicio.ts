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
    nombreProducto: "",
    cantidad: 0,
    precioProducto: 0
  }
  carritos : Carrito[]=[];

  private carros: BehaviorSubject<Carrito[]> = new BehaviorSubject<Carrito[]>(this.carritos);

  constructor(){}

  public carro$: Observable<Carrito[]> = this.carros.asObservable();

  public setCarrito(carros: Carrito[]): void{
    this.carros.next(carros);
  }
  public resetCarrito(): void{
    this.carros.next(this.carritos);
  }

}
