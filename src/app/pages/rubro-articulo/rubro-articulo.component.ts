import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { RubroArticulo } from 'src/app/entidades/RubroArticulo';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';
import { RubroArticuloService } from 'src/app/servicios/rubro-articulo.service';

@Component({
  selector: 'app-rubro-articulo',
  templateUrl: './rubro-articulo.component.html',
  styleUrls: ['./rubro-articulo.component.css'],
})
export class RubroArticuloComponent implements OnInit {
  rubros: RubroArticulo[] = [];
  articulosInsumos: ArticuloInsumo[] = [];
  loading = true;

  constructor(
    private servicioRubroArticulo: RubroArticuloService,
    private router: Router,
    private servicioInsumo: ArticuloInsumoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.servicioRubroArticulo
      .getRubrosArticuloFromDataBase()
      .subscribe((data) => {
        console.log(data);
        for (let rubroDB in data) {
          console.log(data[rubroDB]);
          this.rubros.push(data[rubroDB]);
        }
        this.loading = false;
      });
    this.servicioInsumo.getArticulosInsumoFromDataBase().subscribe((dataMF) => {
      console.log(dataMF);
      for (let articuloDBMF in dataMF) {
        console.log(dataMF[articuloDBMF]);
        this.articulosInsumos.push(dataMF[articuloDBMF]);
      }
      this.loading = false;
    });
  }

  delete(idRubroArticulo: number) {
    var opcion = confirm('Esta seguro que desea eliminar el rubro artículo?');
    if (opcion === true) {
      this.servicioRubroArticulo.deleteRubroArticuloFetch(idRubroArticulo);
      location.reload();
    }
  }
}
