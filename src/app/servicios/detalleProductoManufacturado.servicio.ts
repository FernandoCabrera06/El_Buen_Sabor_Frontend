import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ArticuloManufacturado } from '../entidades/ArticuloManufacturado';
import { Bebida } from '../entidades/dto/BebidaDto';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RubroGeneral } from '../entidades/RubroGeneral';
import { PrecioArticuloManufacturado } from '../entidades/PrecioArticuloManufacturado';

@Injectable({
  providedIn: 'root',
})
export class detalleProductoManufactuardoServicio {
  articulo: ArticuloManufacturado = {
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: '',
    imagenArticuloManu: '',
    preciosArticulosManufacturados: [new PrecioArticuloManufacturado()],
    stock: 0,
    insumos: [],
    rubroGeneral: new RubroGeneral(),
  };

  articuloBebida: Bebida = {
    idBebida: 0,
    nombreBebida: '',
    imagenBebida: '',
    precioTotal: 0,
    stock: 0,
  };

  private producto: BehaviorSubject<ArticuloManufacturado> =
    new BehaviorSubject<ArticuloManufacturado>(this.articulo);
  private bebida: BehaviorSubject<Bebida> = new BehaviorSubject<Bebida>(
    this.articuloBebida
  );

  constructor() {}

  public producto$: Observable<ArticuloManufacturado> =
    this.producto.asObservable();
  public bebida$: Observable<Bebida> = this.bebida.asObservable();

  public setProducto(producto: ArticuloManufacturado): void {
    this.producto.next(producto);
  }
  public resetProducto(): void {
    this.producto.next(this.articulo);
  }

  public setBebida(bebida: Bebida): void {
    this.bebida.next(bebida);
  }
  public resetBebida(): void {
    this.bebida.next(this.articuloBebida);
  }
}
