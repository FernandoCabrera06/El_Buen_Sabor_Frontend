import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumo } from 'src/app/entidades/ArticuloInsumo';
import { PrecioArticuloInsumo } from 'src/app/entidades/PrecioArticuloInsumo';
import { RubroArticulo } from 'src/app/entidades/RubroArticulo';
import { ArticuloInsumoService } from 'src/app/servicios/articulo-insumo.service';
import { RubroArticuloService } from 'src/app/servicios/rubro-articulo.service';

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
    preciosArticulosInsumo: [new PrecioArticuloInsumo()],
    rubroArticulo: new RubroArticulo(),
  };

  new = false;
  idArticuloInsumo!: number;
  resultado = '';
  respuestaBooleans: string[] = ['SI', 'NO'];
  constructor(
    private servicioInsumo: ArticuloInsumoService,
    private servicioRubroArt: RubroArticuloService,
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

  rubros: RubroArticulo[] = [];

  ngOnInit(): void {
    this.servicioRubroArt.getRubrosArticuloFromDataBase().subscribe((data) => {
      for (let rubroArtDB in data) {
        this.rubros.push(data[rubroArtDB]);
      }
    });
  }
  capturarImagen(event): any {
    this.insumo.imagenArticuloInsumo = event.target.files[0].name;
  }
  addNew(formu: NgForm) {
    this.router.navigate(['/insumo', '0']);
    formu.reset({
      idArticuloInsumo: '',
      denominacionArticuloInsumo: '',
      imagenArticuloInsumo: '',
      stockActual: 0,
      stockMinimo: 0,
      unidadMedidaArticuloInsumo: '',
      esArticuloInsumo: '',
      bajaArticuloInsumo: '',
      preciosArticulosInsumo: [],
      rubroArticulo: new RubroArticulo(),
    });
  }

  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.insumo.rubroArticulo.articulosInsumos = [];
    this.servicioInsumo.guardarPOST(this.insumo, this.insumo.idArticuloInsumo);
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/insumos']);
  }
}
