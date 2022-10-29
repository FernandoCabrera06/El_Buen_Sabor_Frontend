import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { ArticuloMFRubroDto } from 'src/app/entidades/ArticuloMFRubroDto';
import { PrecioArticuloManufacturado } from 'src/app/entidades/PrecioArticuloManufacturado';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';

@Component({
  selector: 'app-detalle-receta-manufacturado',
  templateUrl: './detalle-receta-manufacturado.component.html',
  styleUrls: ['./detalle-receta-manufacturado.component.css'],
})
export class DetalleRecetaManufacturadoComponent implements OnInit {
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
  new = false;
  idArticuloManufacturado!: number;
  resultado = '';

  constructor(
    private servicioManu: ManufacturadosService,
    private router: Router,
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

  rubros: RubroGeneral[] = [];
  ngOnInit(): void {
    this.servicioManu.getRubrosGeneralesFromDataBase().subscribe((data) => {
      for (let rubroGenDB in data) {
        this.rubros.push(data[rubroGenDB]);
      }
    });
  }

  volverGrillaManufacturados() {
    // this.servicioManu.resetProducto();
    this.router.navigate(['/admin/manufacturados']);
  }
}
