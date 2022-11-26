import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';
import Swal from 'sweetalert2';

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
        // Ordeno por Nombre y Rubro
        this.articulos
          .sort((unArticulo, otroArticulo) =>
            unArticulo.denominacionArticuloManu.localeCompare(
              otroArticulo.denominacionArticuloManu
            )
          )
          .sort((unArticulo, otroArticulo) =>
            unArticulo.rubroGeneral.denominacionRubroGeneral.localeCompare(
              otroArticulo.rubroGeneral.denominacionRubroGeneral
            )
          );
        this.loading = false;
      });
  }

  delete(idArticuloManu: number) {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar este articulo manufacturado?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioManu.deleteArticuloManufacturadoFetch(idArticuloManu);
        location.reload();
      }
    });
  }

  verDetalle(idx: number) {
    console.log('ID ARTICULO MANUFACTURADO ' + idx);
    this.router.navigate(['/detalleRecetaManufacturado', idx]);
  }
}
