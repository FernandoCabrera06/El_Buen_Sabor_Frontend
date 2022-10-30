import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { ArticuloMFRubroDto } from 'src/app/entidades/ArticuloMFRubroDto';
import { PrecioArticuloManufacturado } from 'src/app/entidades/PrecioArticuloManufacturado';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';

@Component({
  selector: 'app-mf-detalles',
  templateUrl: './mf-detalles.component.html',
  styleUrls: ['./mf-detalles.component.css'],
})
export class MfDetallesComponent implements OnInit {
  articulo: ArticuloMFRubroDto = {
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: '',
    imagenArticuloManu: '',
    preciosArticulosManufacturados: [new PrecioArticuloManufacturado()],
    bajaArticuloManu: false,
    stock: 0,
    articuloManufacturadoDetalles: [new ArticuloManufacturadoDetalle()],
    rubroGeneral: new RubroGeneral(),
  };
  idArticuloManufacturado!: number;

  constructor(
    private router: Router,
    private servicioManu: ManufacturadosService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.idArticuloManufacturado = parametros['idArticuloManufacturado'];

      if (this.idArticuloManufacturado != 0) {
        servicioManu
          .getArticuloManufacturadoEnBaseDatosXId(this.idArticuloManufacturado)
          .subscribe(
            (articuloEncontrado: any) =>
              (this.articulo = articuloEncontrado as ArticuloMFRubroDto)
          );
      } else {
        console.log('ES NUEVO');
      }
    });
  }

  ngOnInit(): void {}

  delete(idArticuloManufacturadoDetalle: number) {
    var opcion = confirm(
      'Esta seguro que desea eliminar este insumo del producto?'
    );
    if (opcion == true) {
      for (let artMFdetalle of this.articulo.articuloManufacturadoDetalles) {
        this.articulo.articuloManufacturadoDetalles =
          this.articulo.articuloManufacturadoDetalles.filter(
            (artMFdetalle) =>
              artMFdetalle.idArticuloManufacturadoDetalle !=
              idArticuloManufacturadoDetalle
          );
      }
      this.servicioManu.guardarPOST(
        this.articulo,
        this.articulo.idArticuloManufacturado
      );
    }
  }
}
