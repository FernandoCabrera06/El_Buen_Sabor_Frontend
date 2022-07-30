import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Reporte } from 'src/app/entidades/dto/Reporte';
import { ProductosServicio } from 'src/app/servicios/productos.servicio';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import {Bebida} from 'src/app/entidades/dto/BebidaDto';
import { DetalleProductoComponent } from '../detalleProducto/detalleProducto.component';
import {detalleProductoManufactuardoServicio} from 'src/app/servicios/detalleProductoManufacturado.servicio';
import{Carrito} from 'src/app/entidades/dto/CarritoDto';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  articulo: ArticuloManufacturado = {
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: '',
    imagenArticuloManu: '',
    precioTotal: 0,
    stock: 0,
    insumos:[],
    idRubroGeneral:0

  }

  idRubroGeneral:number= 0;


  articulos: ArticuloManufacturado[] = [];

  bebida: Bebida = {
    idBebida: 0,
    nombreBebida: '',
    imagenBebida: '',
    precioTotal: 0,
    stock: 0,
  };
  bebidas: Bebida[] = [];

  carrito: Carrito ={
    id:0,
    nombreProducto: "",
    cantidad: 0,
    precioProducto: 0,
    subTotal:0,
    horasCocina:0
  }
  carritos : Carrito[]=[];
  rol:string|null="";
  loading = true;
  constructor(private router: Router,private activeRoute:ActivatedRoute,private serv:ProductosServicio, private serArtManu:detalleProductoManufactuardoServicio ) {
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit(): void {
    this.serv.getArticulosManufacturadosFromDataBase().subscribe((data) => {
      console.log(data);
      for (let articuloDB in data) {
        console.log(data[articuloDB]);
        this.articulos.push(data[articuloDB]);
      }
      this.loading = false;
    });

    this.serv.getBebidasFromDataBase().subscribe((dato) => {
      console.log(dato);
      for (let bebidaDb in dato) {
        console.log(dato[bebidaDb]);
        this.bebidas.push(dato[bebidaDb]);
      }
      this.loading = false;
    });


  }

  detalleProducto(i:number){
     this.serArtManu.setProducto(this.articulos[i]);
     this.router.navigate(['detalle']);
  }
  detalleBebida(i:number){
    this.serArtManu.setBebida(this.bebidas[i]);
    this.router.navigate(['detalle']);
  }


  agregar(i:number){
    if (this.hayStock(i)) {
      const dato = localStorage.getItem('carro');
      alert("Producto agregado al carrito");
      if(dato) this.carritos = JSON.parse(dato);
      let nuevo ={
        id:0,
        nombreProducto:'',
        cantidad:0,
        precioProducto:0,
        subTotal:0,
        horasCocina:0
      }
       nuevo.id= this.articulos[i].idArticuloManufacturado;
       nuevo.nombreProducto = this.articulos[i].denominacionArticuloManu;
       nuevo.cantidad = 1;
       nuevo.precioProducto = this.articulos[i].precioTotal;
       nuevo.subTotal = this.articulos[i].precioTotal;
       nuevo.horasCocina = this.articulos[i].tiempoEstimadoCocina;
       this.carritos.push(nuevo);
       localStorage.setItem('carro',JSON.stringify(this.carritos));
    }
  }
  agregarBebida(i:number){
    if (this.hayStock(i)) {
      const dato = localStorage.getItem('carro');
      alert("Bebida agregada al carrito");
      if(dato) this.carritos = JSON.parse(dato);
      let nuevo ={
        id:0,
        nombreProducto:'',
        cantidad:0,
        precioProducto:0,
        subTotal:0,
        horasCocina:0
      }
       nuevo.id = this.bebidas[i].idBebida;
       nuevo.nombreProducto = this.bebidas[i].nombreBebida;
       nuevo.cantidad = 1;
       nuevo.precioProducto = this.bebidas[i].precioTotal;
       nuevo.subTotal = this.bebidas[i].precioTotal;
       this.carritos.push(nuevo);
       localStorage.setItem('carro',JSON.stringify(this.carritos));
    }
  }

  hayStock(i:number){
    let producto = this.articulos[i];
    if(producto.stock>0){
      return true;
    }else{
      return false;
    }
  }



  }
