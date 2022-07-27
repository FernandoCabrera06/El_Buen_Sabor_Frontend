import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';

@Component({
  selector: 'app-manufacturados',
  templateUrl: './manufacturados.component.html',
  styleUrls: ['./manufacturados.component.css'],
})
export class ManufacturadosComponent implements OnInit {
  articulos: ArticuloManufacturado[] = [];
  loading = true;

  constructor(
    private servicioManu: ManufacturadosService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.servicioManu
      .getArticulosManufacturadosFromDataBase()
      .subscribe((data) => {
        console.log(data);
        for (let articuloDB in data) {
          console.log(data[articuloDB]);
          this.articulos.push(data[articuloDB]);
        }
        this.loading = false;
      });
  }

  delete(idArticuloManu: number) {
    var opcion = confirm(
      'Esta seguro que desea eliminar el articulo manufacturado?'
    );
    if (opcion == true) {
      this.servicioManu.deleteArticuloManufacturadoFetch(idArticuloManu);
      location.reload();
    }
  }
}
