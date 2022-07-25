import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { ProductosServicio } from 'src/app/servicios/productos.servicio';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import {Bebida} from 'src/app/entidades/dto/BebidaDto';
import { DetalleProductoComponent } from '../detalleProducto/detalleProducto.component';
import {detalleProductoManufactuardoServicio} from 'src/app/servicios/detalleProductoManufacturado.servicio';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  articulo: ArticuloManufacturado ={
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: "",
    imagenArticuloManu: "",
    precioTotal: 0,
    stock: 0
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

  carrito:any;

  loading = true;
  constructor(private router: Router,private activeRoute:ActivatedRoute,private serv:ProductosServicio, private serArtManu:detalleProductoManufactuardoServicio ) {
    localStorage.setItem("carro", JSON.stringify(this.carrito));
  }

  ngOnInit(): void {
    this.serv.getArticulosManufacturadosFromDataBase()
    .subscribe(data=>{
      console.log(data);
      for(let articuloDB in data){
        console.log(data[articuloDB]);
        this.articulos.push(data[articuloDB]);
      }
      this.loading = false;
    });

    this.serv.getBebidasFromDataBase()
    .subscribe(dato=>{
      console.log(dato);
      for(let bebidaDb in dato){
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
      //this.carrito = JSON.parse(localStorage.getItem("carro"));
      if (this.carrito == null) {
        this.carrito = [{
          articuloManufacturado: null,
          articuloReventa: null
        }];
        this.carrito[0].articuloManufacturado = this.articulos[i];
        this.carrito[0].cantidad = 1;

      } else {
        if (this.existe(this.articulos[i].idArticuloManufacturado) == false) {

          let nuevo = {
            articuloManufacturado: null,
            articuloReventa: null,
            cantidad: 0
          };
          //nuevo.articuloManufacturado = this.articulos[i];
          nuevo.cantidad = 1;
          this.carrito.push(nuevo);

        }
      }
      localStorage.setItem("carro", JSON.stringify(this.carrito));
      console.log('El objeto agregado es : ', this.articulos[i]);
      console.log('El carrito actual es : ', this.carrito);

      alert('Se agrego al carrito');
    } else {
      alert("No hay stock");
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

  existe(id:any) {
    for (let c of this.carrito) {
      if (c.articuloManufacturado != null) {
        if (c.articuloManufacturado.id == id) {
          c.cantidad++;
          return true;
        }
      }

    }
    return false;
  }

}
