import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';

@Component({
  selector: 'app-form-manufacturados',
  templateUrl: './form-manufacturados.component.html',
  styleUrls: ['./form-manufacturados.component.css'],
})
export class FormManufacturadosComponent implements OnInit {
  articulo: ArticuloManufacturado = {
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: '',
    imagenArticuloManu: '',
    precioTotal: 0,
    stock: 0,
    insumos: ([] = []),
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
              (this.articulo = articuloEncontrado as ArticuloManufacturado)
          );
      } else {
        console.log('ES NUEVO');
      }
    });
  }

  ngOnInit(): void {}

  addNew(formu: NgForm) {
    this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      idArticuloManufacturado: 0,
      tiempoEstimadoCocina: 0,
      denominacionArticuloManu: '',
      imagenArticuloManu: '',
      precioTotal: 0,
      stock: 0,
    });
  }

  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.servicioManu.guardarPOST(this.articulo);
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/manufacturados']);
  }
}
