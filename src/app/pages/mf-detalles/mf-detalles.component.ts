import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { ArticuloMFRubroDto } from 'src/app/entidades/ArticuloMFRubroDto';
import { PrecioArticuloManufacturado } from 'src/app/entidades/PrecioArticuloManufacturado';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';
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

  // HAY QUE SETEARLO BUSCANDOLO POR ID
  artManuDetalle: ArticuloManufacturadoDetalle = {
    idArticuloManufacturadoDetalle: 0,
    cantidadArticuloManuDetalle: 0,
    unidadMedidaArticuloManuDetalle: '',
    articuloInsumo: new ArticuloInsumo(),
  };

  constructor(
    private router: Router,
    private servicioManu: ManufacturadosService,
    private servicioInsumos: ArticuloInsumoService,
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

  add(idArticuloManufacturadoDetalle: number) {
    var opcion = confirm(
      'Esta seguro que desea AGREGAR este insumo del producto?: ' +
        idArticuloManufacturadoDetalle
    );
    if (opcion == true) {
    }
  }

  edit(idArticuloManufacturadoDetalle: number) {
    var opcion = confirm(
      'Esta seguro que desea EDITAR este insumo del producto?: ' +
        idArticuloManufacturadoDetalle
    );
    if (opcion == true) {
    }
  }
}
