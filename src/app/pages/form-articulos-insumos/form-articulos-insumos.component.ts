import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { PrecioArticuloInsumo } from 'src/app/entidades/PrecioArticuloInsumo';
import { RubroArticulo } from 'src/app/entidades/RubroArticulo';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';

@Component({
  selector: 'app-form-articulos-insumos',
  templateUrl: './form-articulos-insumos.component.html',
  styleUrls: ['./form-articulos-insumos.component.css'],
})
export class FormArticulosInsumosComponent implements OnInit {
  insumo: ArticuloInsumo = {
    idArticuloInsumo: 0,
    denominacionArticuloInsumo: '',
    imagenArticuloInsumo: '',
    stockActual: 0,
    stockMinimo: 0,
    unidadMedidaArticuloInsumo: '',
    esArticuloInsumo: false,
    bajaArticuloInsumo: false,
    preciosArticulosInsumo: [],
    rubroArticulo: new RubroArticulo(),
  };
  new = false;
  idArticuloInsumo!: number;
  resultado = '';

  constructor(
    private servicioInsumo: ArticuloInsumoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.idArticuloInsumo = parametros['idArticuloInsumo'];

      if (this.idArticuloInsumo != 0) {
        servicioInsumo
          .getArticuloInsumoEnBaseDatosXId(this.idArticuloInsumo)
          .subscribe(
            (insumoEncontrado: any) =>
              (this.insumo = insumoEncontrado as ArticuloInsumo)
          );
      } else {
        console.log('ES NUEVO');
      }
    });
  }

  ngOnInit(): void {}

  addNew(formu: NgForm) {
    this.router.navigate(['/insumo', '0']);
    formu.reset({
    idArticuloInsumo : 0,
    denominacionArticuloInsumo: '',
    imagenArticuloInsumo: '',
    stockActual: 0,
    stockMinimo: 0,
    unidadMedidaArticuloInsumo: '',
    esArticuloInsumo: false,
    bajaArticuloInsumo: false,
    preciosArticulosInsumo: [], // ------> REVISAR ACA, XQ NO TOMA UN ARRAY DE TIPO preciosArticulosInsumos[]
    rubroArticulo: new RubroArticulo(),
    });
  }

  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.servicioInsumo.guardarPOST(this.insumo);
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/insumos']);
  }
}
