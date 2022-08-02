import { Component, OnInit,VERSION } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { PedidoServicio } from 'src/app/servicios/pedidos.servicio';
import { RankingComidasDto } from '../../../entidades/dto/RankingComidasDto';
import * as XLSX from 'xlsx';
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
  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}


