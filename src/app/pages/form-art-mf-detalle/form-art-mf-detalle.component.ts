import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';
import { DetalleManufacturadoService } from 'src/app/servicios/detalle-manufacturado.service';

@Component({
  selector: 'app-form-art-mf-detalle',
  templateUrl: './form-art-mf-detalle.component.html',
  styleUrls: ['./form-art-mf-detalle.component.css'],
})
export class FormArtMfDetalleComponent implements OnInit {
  artManuDetalle: ArticuloManufacturadoDetalle = {
    idArticuloManufacturadoDetalle: 0,
    cantidadArticuloManuDetalle: 0,
    unidadMedidaArticuloManuDetalle: '',
    articuloInsumo: new ArticuloInsumo(),
  };

  idArtMfdetalle!: number;
  constructor(
    private servicioArtMfDetalle: DetalleManufacturadoService,
    private router: Router,
    private servicioInsumos: ArticuloInsumoService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.idArtMfdetalle = parametros['idArtMfDetalle'];

      if (this.idArtMfdetalle != 0) {
        servicioArtMfDetalle
          .getArtMfDetalleEnBaseDatosXId(this.idArtMfdetalle)
          .subscribe(
            (artManuDetalleEncontrado: any) =>
              (this.artManuDetalle =
                artManuDetalleEncontrado as ArticuloManufacturadoDetalle)
          );
      }
    });
  }
  insumos: ArticuloInsumo[] = [];
  ngOnInit(): void {
    this.servicioInsumos.getArticulosInsumoFromDataBase().subscribe((data) => {
      for (let insumoGenDB in data) {
        if (data[insumoGenDB].esArticuloInsumo) {
          this.insumos.push(data[insumoGenDB]);
        }
      }
    });
  }

  addNew(formu: NgForm) {
    this.router.navigate(['/formArtMfDetalle', '0']);
    formu.reset({
      idArticuloManufacturadoDetalle: 0,
      cantidadArticuloManuDetalle: 0,
      unidadMedidaArticuloManuDetalle: '',
      articuloInsumo: new ArticuloInsumo(),
      idArticuloManufacturado: 0,
    });
  }

  async guardarPOST() {
    this.servicioArtMfDetalle.guardarPOST(
      this.artManuDetalle,
      this.artManuDetalle.idArticuloManufacturadoDetalle
    );
    this.router.navigate(['/manufacturado', this.artManuDetalle]);
  }
}
