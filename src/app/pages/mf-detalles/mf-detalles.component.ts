import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reload } from '@firebase/auth';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { window } from 'rxjs';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { ArticuloMFRubroDto } from 'src/app/entidades/ArticuloMFRubroDto';
import { PrecioArticuloManufacturado } from 'src/app/entidades/PrecioArticuloManufacturado';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';
import Swal from 'sweetalert2';

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
    articuloManufacturadoDetalles: [],
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
    Swal.fire({
      title: '¿Esta seguro que desea eliminar este insumo del producto?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
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
    });
  }

  add(articuloManufacturadoDetalle: ArticuloManufacturadoDetalle) {
    // var opcion = confirm(
    //   'Esta seguro que desea AGREGAR este insumo del producto?: ' +
    //     articuloManufacturadoDetalle.idArticuloManufacturadoDetalle
    // );
    // if (opcion == true) {
    Swal.fire({
      title: '¿Desea Agregar/editar este insumo del producto?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let encontroInsumo = false;
        this.articulo.articuloManufacturadoDetalles.forEach((detalle) => {
          if (
            detalle.articuloInsumo.idArticuloInsumo ==
            articuloManufacturadoDetalle.articuloInsumo.idArticuloInsumo
          ) {
            detalle.articuloInsumo = this.artManuDetalle.articuloInsumo;
            detalle.cantidadArticuloManuDetalle =
              this.artManuDetalle.cantidadArticuloManuDetalle;
            detalle.idArticuloManufacturadoDetalle =
              this.artManuDetalle.idArticuloManufacturadoDetalle;
            detalle.unidadMedidaArticuloManuDetalle =
              this.artManuDetalle.unidadMedidaArticuloManuDetalle;
            encontroInsumo = true;
          }
        });
        if (
          !encontroInsumo ||
          this.articulo.articuloManufacturadoDetalles.length < 1
        ) {
          this.articulo.articuloManufacturadoDetalles.push(
            articuloManufacturadoDetalle
          );
        }
        this.servicioManu.guardarPOST(
          this.articulo,
          this.articulo.idArticuloManufacturado
        );
        location.reload();
      }
    });
  }

  editarAMFD(artMFdetalle: ArticuloManufacturadoDetalle) {
    this.artManuDetalle.articuloInsumo = artMFdetalle.articuloInsumo;
    this.artManuDetalle.cantidadArticuloManuDetalle =
      artMFdetalle.cantidadArticuloManuDetalle;
    this.artManuDetalle.idArticuloManufacturadoDetalle =
      artMFdetalle.idArticuloManufacturadoDetalle;
    this.artManuDetalle.unidadMedidaArticuloManuDetalle =
      artMFdetalle.unidadMedidaArticuloManuDetalle;
  }
  limpiarCampos() {
    this.artManuDetalle.articuloInsumo = new ArticuloInsumo();
    this.artManuDetalle.cantidadArticuloManuDetalle = 0;
    this.artManuDetalle.idArticuloManufacturadoDetalle = 0;
    this.artManuDetalle.unidadMedidaArticuloManuDetalle = '';
  }
}
