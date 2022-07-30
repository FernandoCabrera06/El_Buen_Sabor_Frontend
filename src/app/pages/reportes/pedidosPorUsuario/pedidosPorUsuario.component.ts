import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { PedidoServicio } from 'src/app/servicios/pedidos.servicio';
import { PedidosPorUsuarioDto } from '../../../entidades/dto/PedidosPorUsuarioDto';

@Component({
  selector: 'app-ingresos',
  templateUrl: './pedidosPorUsuario.component.html',
  styleUrls: ['./pedidosPorUsuario.component.css']
})
export class PedidosPorUsuarioComponent  implements OnInit{

  reporte:Reporte = {
    fechaDesde:  "",
    fechaHasta: "",
  };
  pedidoUsuario: PedidosPorUsuarioDto ={
    idUsuario:  0,
    nombreUsuario: "",
    apellidoUsuario: "",
    cantidadPedidos:  0
  }

  pedidos: PedidosPorUsuarioDto[] = [];


  constructor( private router: Router,private activeRoute:ActivatedRoute,private serv:PedidoServicio) {

   }


  ngOnInit(): void {
  }

  pedidosPorUsuario(){
     this.serv.getPedidosPorUsuario(this.reporte.fechaDesde,this.reporte.fechaHasta).subscribe((dato:any)=>{
        this.pedidos = dato;
     });

  }

}
