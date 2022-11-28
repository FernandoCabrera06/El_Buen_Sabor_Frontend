import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { end } from '@popperjs/core';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ArticuloManufacturadoDetalle } from 'src/app/entidades/ArticuloManufacturadoDetalle';
import { ArticuloMFRubroDto } from 'src/app/entidades/ArticuloMFRubroDto';
import { PrecioArticuloManufacturado } from 'src/app/entidades/PrecioArticuloManufacturado';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';

@Component({
  selector: 'app-form-manufacturados',
  templateUrl: './form-manufacturados.component.html',
  styleUrls: ['./form-manufacturados.component.css'],
})
export class FormManufacturadosComponent implements OnInit {
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
  new = false;
  idArticuloManufacturado!: number;
  resultado = '';

  constructor(
    private servicioManu: ManufacturadosService,
    private router: Router,
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

  rubros: RubroGeneral[] = [];
  insumos: ArticuloInsumo[] = [];
  artMFDetalle: ArticuloManufacturadoDetalle =
    new ArticuloManufacturadoDetalle();

  ngOnInit(): void {
    this.servicioManu.getRubrosGeneralesFromDataBase().subscribe((data) => {
      for (let rubroGenDB in data) {
        this.rubros.push(data[rubroGenDB]);
      }
    });
    this.servicioInsumos.getArticulosInsumoFromDataBase().subscribe((data) => {
      for (let insumoGenDB in data) {
        if (data[insumoGenDB].esArticuloInsumo) {
          this.insumos.push(data[insumoGenDB]);
        }
      }
    });
  }
  capturarImagen(event): any {
    this.articulo.imagenArticuloManu = event.target.files[0].name;
  }

  addNew(formu: NgForm) {
    this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      idArticuloManufacturado: 0,
      tiempoEstimadoCocina: 0,
      denominacionArticuloManu: '',
      imagenArticuloManu: '',
      bajaArticuloManu: '',
      precioTotal: 0,
      stock: 0,
    });
  }

  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.servicioManu.guardarPOST(
      this.articulo,
      this.articulo.idArticuloManufacturado
    );
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/manufacturados']);
  }
}
