import { Component, OnInit , Input} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { ProductosServicio } from 'src/app/servicios/productos.servicio';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import {Bebida} from 'src/app/entidades/dto/BebidaDto';
import {detalleProductoManufactuardoServicio} from 'src/app/servicios/detalleProductoManufacturado.servicio';

@Component({
  selector: 'app-detalleProducto',
  templateUrl: './detalleProducto.component.html',
  styleUrls: ['./detalleProducto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  articulo: ArticuloManufacturado ={
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: "",
    imagenArticuloManu: "",
    precioTotal: 0,
    stock: 0
  }
  bebida: Bebida ={
    idBebida: 0,
    nombreBebida: "",
    imagenBebida: "",
    precioTotal: 0,
    stock: 0
  }
  constructor(private router: Router,private activeRoute:ActivatedRoute,private serv:detalleProductoManufactuardoServicio) {

  }

  ngOnInit(): void {
    this.serv.producto$.subscribe(
      (data:ArticuloManufacturado)=>{
        this.articulo = data;
      }
    )
    this.serv.bebida$.subscribe(
      (data:Bebida)=>{
        this.bebida = data;
      }
    )

}
volverCatalogoProducto(){
  this.serv.resetProducto();
  this.router.navigate(['catalogo']);
}
volverCatalogoBebida(){
 this.serv.resetBebida();
 this.router.navigate(['catalogo']);
}
agregar(){
}
}
