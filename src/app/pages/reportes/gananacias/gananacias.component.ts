import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { FacturaServicio } from 'src/app/servicios/factura.servicio';

@Component({
  selector: 'app-ganancias',
  templateUrl: './gananacias.component.html',
  styleUrls: ['./ganancias.component.css']
})
export class GananciasComponent  implements OnInit{

  reporte:Reporte = {
    fechaDesde:  "",
    fechaHasta: "",
  };

  gananciasPorPeriodo:any;
  constructor( private router: Router,private activeRoute:ActivatedRoute,private serv:FacturaServicio) { }


  ngOnInit(): void {
  }

  ganancias(){
     this.serv.getGananciaPorPeriodo(this.reporte.fechaDesde,this.reporte.fechaHasta).subscribe((dato:any)=>{
        this.gananciasPorPeriodo = dato;
     });

  }

}
