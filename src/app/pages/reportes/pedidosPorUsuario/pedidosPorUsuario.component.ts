import { Component, OnInit,VERSION } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { PedidoServicio } from 'src/app/servicios/pedidos.servicio';
import { PedidosPorUsuarioDto } from '../../../entidades/dto/PedidosPorUsuarioDto';
import * as XLSX from 'xlsx';
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

  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
