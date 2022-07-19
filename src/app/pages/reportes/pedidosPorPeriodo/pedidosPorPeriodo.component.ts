import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { PedidoServicio } from 'src/app/servicios/pedidos.servicio';
import { RankingComidasDto } from '../../../entidades/dto/RankingComidasDto';

@Component({
  selector: 'app-ingresos',
  templateUrl: './pedidosPorPeriodo.component.html',
  styleUrls: ['./pedidosPorPeriodo.component.css']
})
export class PedidosPorPeriodoComponent  implements OnInit{

  reporte:Reporte = {
    fechaDesde:  "",
    fechaHasta: "",
  };
  comida: RankingComidasDto ={
    nombreComida:"",
    cantPedida: ""
  }

  pedidos: RankingComidasDto[] = [];


  constructor( private router: Router,private activeRoute:ActivatedRoute,private serv:PedidoServicio) {

   }


  ngOnInit(): void {
  }

  pedidosPorUsuario(){
     this.serv.getPedidosPorFechas(this.reporte.fechaDesde,this.reporte.fechaHasta).subscribe((dato:any)=>{
        this.pedidos = dato;
     });

  }

}
