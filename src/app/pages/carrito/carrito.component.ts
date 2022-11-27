import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Reporte } from 'src/app/entidades/dto/Reporte';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { Bebida } from 'src/app/entidades/dto/BebidaDto';
import { DetalleProductoComponent } from '../detalleProducto/detalleProducto.component';
import { detalleProductoManufactuardoServicio } from 'src/app/servicios/detalleProductoManufacturado.servicio';
import { Carrito } from 'src/app/entidades/dto/CarritoDto';
import { CarritoServicio } from 'src/app/servicios/carrito.servicio';
import { Pedido } from 'src/app/entidades/Pedido';
import { PedidoServicio } from 'src/app/servicios/pedidos.servicio';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: Carrito = {
    id: 0,
    nombreProducto: '',
    cantidad: 0,
    precioProducto: 0,
    subTotal: 0,
    horasCocina: 0,
  };
  carritos: Carrito[] = [];
  totalCompra: number = 0;
  subtotal: number = 0;
  totalHoraCocina: number = 0;

  pedido: Pedido = {
    idPedido: 0,
    fechaPedido: '',
    numeroPedido: 0,
    estadoPedido: 0,
    horaEstimadaFinPedido: 0,
    tipoEnvio: 0,
    totalPedido: 0,
    nombreUsuario: '',
  };

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private ser: CarritoServicio,
    private servPedido: PedidoServicio
  ) {}

  ngOnInit(): void {
    const dato = localStorage.getItem('carro');
    if (dato) this.carritos = JSON.parse(dato);
    this.totalCompra = this.carritos.reduce((a, b, c) => (a += b.subTotal), 0);
    console.log('ESTO SON LOS CARRITOS ', this.carritos);
    this.totalHoraCocina = this.carritos.reduce((a, b) => a + b.horasCocina, 0);
  }
  eliminar(i: number) {
    this.carritos.map((item) => {
      if (item.id == i) {
        this.carritos.filter((carrito) => carrito.id != i);
        item.cantidad -= 1;
      }
    });
    this.carritos.splice(i, 1);
    localStorage.setItem('carro', JSON.stringify(this.carritos));
    window.location.reload();
  }

  sumarProducto(idCarrito: number) {
    this.carritos.map((item) => {
      if (item.id == idCarrito) {
        item.cantidad += 1;
        item.subTotal += item.precioProducto;
      }
    });
    localStorage.setItem('carro', JSON.stringify(this.carritos));
    window.location.reload();
  }

  restarProducto(idCarrito: number) {
    this.carritos.map((item) => {
      if (item.id == idCarrito) {
        item.cantidad -= 1;
        item.subTotal -= item.precioProducto;
      }
    });
    localStorage.setItem('carro', JSON.stringify(this.carritos));
    window.location.reload();
  }

  confirmar() {
    localStorage.setItem('carro', JSON.stringify(this.carritos));

    this.pedido.horaEstimadaFinPedido = this.totalHoraCocina;
    this.pedido.totalPedido = this.totalCompra;
    const dato = localStorage.getItem('usuario');
    if (dato) this.pedido.nombreUsuario = dato;
    this.pedido.estadoPedido = 1;
    this.servPedido.guardarPOST(this.pedido);
    this.ser.descontarStock();
    this.ser.resetCarrito();
    this.servPedido.getIdUltimoPedido().subscribe((dato: any) => {
      let id = dato + 1;
      localStorage.setItem('idPedido', JSON.stringify(id));
      this.onNavigate(id);
    });

    //window.close();
  }

  onNavigate(id: any) {
    window.location.href =
      'http://localhost:3000/' + id + '/' + this.pedido.totalPedido;
  }
}
