import { Component, OnInit,NgModule } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm,FormsModule } from '@angular/forms';
import { PedidoDto } from '../../entidades/dto/PedidoDto';
import{Carrito} from 'src/app/entidades/dto/CarritoDto';
import {PedidoServicio} from 'src/app/servicios/pedidos.servicio';
import { Pedido } from '../../entidades/Pedido';

@Component({
  selector: 'app-form-pedidos',
  templateUrl: './form-pedidos.component.html',
  styleUrls: ['./form-pedidos.component.css']
})
export class FormPedidosComponent  implements OnInit{
  pedido: PedidoDto = {
  idPedido: 0,
  fechaPedido: "",
  numeroPedido: 0,
  estadoPedido: "",
  horaEstimadaFinPedido: "0",
  tipoEnvio: 0,
  totalPedido:0,
  nombreUsuario:""

  };
  pedidoSave : Pedido ={
    idPedido: 0,
    fechaPedido: "",
    numeroPedido: 0,
    estadoPedido: 0,
    horaEstimadaFinPedido: 0,
    tipoEnvio: 0,
    totalPedido:0,
    nombreUsuario:""
  }

  estadoPed="En Preparacion";
  selectVisible=false;
  rol:string|null="";
  usuario:string|null="";
  loading = true;
  lista:string[]=["En Preparación","Demorado","Cancelado", "En delivery","Facturado","Pagado"];
  seleccionado:string="";
  constructor(private router: Router,private activeRoute:ActivatedRoute, private servPedido: PedidoServicio ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.pedido.idPedido = parametros['idPedido'];
    });
  }
  ngOnInit(): void {

    this.servPedido
          .getPedidoEnBaseDatosXId(this.pedido.idPedido)
          .subscribe(
            (pedidoEncontrado: any) =>
              (this.pedido = pedidoEncontrado as PedidoDto)
          );



  }
  confirmar(id:number){
    alert(this.pedido.estadoPedido)
    alert(id)


  }
  guardarPOST(){
    this.pedidoSave.idPedido = this.pedido.idPedido;
    this.pedidoSave.fechaPedido = this.pedido.fechaPedido;
    this.pedidoSave.numeroPedido = this.pedido.numeroPedido;
    if(this.seleccionado === "En Preparación"){
      this.pedidoSave.estadoPedido =  1;
    }else if(this.seleccionado === "Demorado"){
      this.pedidoSave.estadoPedido =  2;
    }else if(this.seleccionado=== "Cancelado"){
      this.pedidoSave.estadoPedido =  3;
    }else if(this.seleccionado=== "En delivery"){
      this.pedidoSave.estadoPedido =  4;
    }else if(this.seleccionado=== "Facturado"){
      this.pedidoSave.estadoPedido =  5;
    }else if(this.seleccionado=== "Pagado"){
      this.pedidoSave.estadoPedido =  6;
    }

    this.pedidoSave.horaEstimadaFinPedido = parseInt(this.pedido.horaEstimadaFinPedido);
    this.pedidoSave.tipoEnvio = this.pedido.tipoEnvio;
    this.pedidoSave.totalPedido = this.pedido.totalPedido;
    this.pedidoSave.nombreUsuario = this.pedido.nombreUsuario;
    this.servPedido.guardarPOST(this.pedidoSave);
    this.router.navigate(['pedidos']);
  }
}
