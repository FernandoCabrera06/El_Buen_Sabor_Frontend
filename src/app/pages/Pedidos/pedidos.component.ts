import { Component, OnInit,NgModule } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm,FormsModule } from '@angular/forms';
import { PedidoDto } from '../../entidades/dto/PedidoDto';
import{Carrito} from 'src/app/entidades/dto/CarritoDto';
import {PedidoServicio} from 'src/app/servicios/pedidos.servicio';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent  implements OnInit{
  pedido: PedidoDto = {
  idPedido: 0,
  fechaPedido: "",
  numeroPedido: 0,
  estadoPedido: "",
  horaEstimadaFinPedido: "0",
  tipoEnvio: 0,
  totalPedido:0,
  nombreUsuario:""

  }
  pedidos: PedidoDto[] = [];
  estadoPed="En Preparacion";
  selectVisible=false;
  rol:string|null="";
  usuario:string|null="";
  loading = true;
  constructor(private router: Router,private activeRoute:ActivatedRoute, private servPedido: PedidoServicio ) {
    this.rol = localStorage.getItem('rol');
    this.usuario = localStorage.getItem('usuario');
  }
  ngOnInit(): void {
    if(this.rol == "Cliente"){
      this.servPedido.getPedidosPorUsuarioFromDataBase(this.usuario).subscribe((data) => {
        console.log(data);
        for (let pedidoDB in data) {
          console.log(data[pedidoDB]);
          this.pedidos.push(data[pedidoDB]);
        }
        this.loading = false;
      });
    }else{
      this.servPedido.getPedidosFromDataBase().subscribe((data) => {
        console.log(data);
        for (let pedidoDB in data) {
          console.log(data[pedidoDB]);
          this.pedidos.push(data[pedidoDB]);
        }
        this.loading = false;
      });
    }

  }
  confirmar(idPedido:number){

    this.router.navigate(['/formPedidos/', idPedido]);
  }
}
