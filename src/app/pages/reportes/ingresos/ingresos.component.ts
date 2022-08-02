import { Component, OnInit,VERSION } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Reporte} from 'src/app/entidades/dto/Reporte';
import { FacturaServicio } from 'src/app/servicios/factura.servicio';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent  implements OnInit{

  reporte:Reporte = {
    fechaDesde:  "",
    fechaHasta: "",
  };

  ingresosPorPeriodo:any;
  constructor( private router: Router,private activeRoute:ActivatedRoute,private serv:FacturaServicio) { }


  ngOnInit(): void {
  }

  ingresos(){
     this.serv.getIngresosPorPeriodo(this.reporte.fechaDesde,this.reporte.fechaHasta).subscribe((dato:any)=>{
        this.ingresosPorPeriodo = dato;
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
