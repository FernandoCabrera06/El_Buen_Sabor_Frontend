import { Component, OnInit , Input} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { ProductosServicio } from 'src/app/servicios/productos.servicio';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import {Bebida} from 'src/app/entidades/dto/BebidaDto';
import {detalleProductoManufactuardoServicio} from 'src/app/servicios/detalleProductoManufacturado.servicio';
import{Carrito} from 'src/app/entidades/dto/CarritoDto';

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
    stock: 0,
    insumos:[],
    idRubroGeneral: 0

  }
  articulos: ArticuloManufacturado[] = [];
  bebida: Bebida ={
    idBebida: 0,
    nombreBebida: "",
    imagenBebida: "",
    precioTotal: 0,
    stock: 0
  }
  bebidas: Bebida[] = [];
  carrito: Carrito ={
    id:0,
    nombreProducto: "",
    cantidad: 0,
    precioProducto: 0,
    subTotal:0
  }
  carritos : Carrito[]=[];
  rol:string|null="";
  loading = true;

  cantidadProducto:number=1;
  cantidadBebida:number=1;
  constructor(private router: Router,private activeRoute:ActivatedRoute,private serv:detalleProductoManufactuardoServicio) {
    this.rol = localStorage.getItem('rol');
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
  if (this.articulo.stock>0) {
    const dato = localStorage.getItem('carro');
    alert("Producto agregado al carrito");
    if(dato) this.carritos = JSON.parse(dato);
    let nuevo ={
      id:0,
      nombreProducto:'',
      cantidad:0,
      precioProducto:0,
      subTotal:0
    }
     nuevo.id= this.articulo.idArticuloManufacturado;
     nuevo.nombreProducto = this.articulo.denominacionArticuloManu;
     nuevo.cantidad = this.cantidadProducto;
     nuevo.precioProducto = this.articulo.precioTotal;
     nuevo.subTotal = this.articulo.precioTotal*this.cantidadProducto;
     this.carritos.push(nuevo);
     localStorage.setItem('carro',JSON.stringify(this.carritos));
  }
}
agregarBebida(){
  if (this.bebida.stock>0) {
    const dato = localStorage.getItem('carro');
    alert("Bebida agregada al carrito");
    if(dato) this.carritos = JSON.parse(dato);
    let nuevo ={
      id:0,
      nombreProducto:'',
      cantidad:0,
      precioProducto:0,
      subTotal:0
    }
     nuevo.id = this.bebida.idBebida;
     nuevo.nombreProducto = this.bebida.nombreBebida;
     nuevo.cantidad = this.cantidadBebida;
     nuevo.precioProducto = this.bebida.precioTotal;
     nuevo.subTotal = this.bebida.precioTotal * this.cantidadBebida;
     this.carritos.push(nuevo);
     localStorage.setItem('carro',JSON.stringify(this.carritos));
  }
}

}
