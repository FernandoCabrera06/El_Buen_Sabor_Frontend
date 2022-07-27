import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import {Bebida} from 'src/app/entidades/dto/BebidaDto';
import { DetalleProductoComponent } from '../detalleProducto/detalleProducto.component';
import {detalleProductoManufactuardoServicio} from 'src/app/servicios/detalleProductoManufacturado.servicio';
import{Carrito} from 'src/app/entidades/dto/CarritoDto';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {


  carrito: Carrito ={
    id:0,
    nombreProducto: "",
    cantidad: 0,
    precioProducto: 0,
    subTotal:0
  }
  carritos : Carrito[]=[];
  totalCompra:number=0;
  subtotal: number=0;
  constructor(private router: Router,private activeRoute:ActivatedRoute ) {

  }

  ngOnInit(): void {
    const dato = localStorage.getItem('carro');
      if(dato) this.carritos = JSON.parse(dato);
      this.totalCompra = this.carritos.reduce((a,b,c)=> a+=b.subTotal,0);
  }
  eliminar(i:number){
     this.carritos.splice(i,1);
     localStorage.setItem('carro',JSON.stringify(this.carritos));
     window.location.reload();
  }

}
