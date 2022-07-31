import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';
import{Carrito} from 'src/app/entidades/dto/CarritoDto';
import {PedidoServicio} from 'src/app/servicios/pedidos.servicio';

@Component({
  selector: 'app-pedidoAprobado',
  templateUrl: './pedidoAprobado.component.html',
  styleUrls: ['./pedidoAprobado.component.css']
})
export class PedidoAprobadoComponent  implements OnInit{

  constructor(private router: Router,private activeRoute:ActivatedRoute, private servPedido: PedidoServicio ) {

  }
  ngOnInit(): void {
    const dato = localStorage.getItem('idPedido');
    let id:any;
    if(dato) id = dato;
    alert(id);
    this.servPedido.getPagarPedido(id);
  }

}
