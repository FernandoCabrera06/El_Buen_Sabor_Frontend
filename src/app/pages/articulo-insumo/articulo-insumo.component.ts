import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';

@Component({
  selector: 'app-articulo-insumo',
  templateUrl: './articulo-insumo.component.html',
  styleUrls: ['./articulo-insumo.component.css'],
})
export class ArticuloInsumoComponent implements OnInit {
  insumos: ArticuloInsumo[] = [];
  loading = true;

  constructor(
    private servicioInsumo: ArticuloInsumoService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.servicioInsumo.getArticulosInsumoFromDataBase().subscribe((data) => {
      for (let articuloDB in data) {
        this.insumos.push(data[articuloDB]);
      }
      this.loading = false;
    });
  }

  delete(idArticuloInsumo: number) {
    var opcion = confirm('Esta seguro que desea eliminar el articulo insumo?');
    if (opcion == true) {
      this.servicioInsumo.deleteArticuloInsumoFetch(idArticuloInsumo);
      location.reload();
    }
  }
}
