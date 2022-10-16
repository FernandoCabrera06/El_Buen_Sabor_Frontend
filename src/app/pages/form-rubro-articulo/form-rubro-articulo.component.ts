import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroArticulo } from 'src/app/entidades/RubroArticulo';
import { RubroArticuloService } from 'src/app/servicios/rubro-articulo.service';

@Component({
  selector: 'app-form-rubro-articulo',
  templateUrl: './form-rubro-articulo.component.html',
  styleUrls: ['./form-rubro-articulo.component.css'],
})
export class FormRubroArticuloComponent implements OnInit {
  rubroArticulo: RubroArticulo = {
    idRubroArticulo: 0,
    denominacionRubroArticulo: '',
    articulosInsumos: [],
  };
  new = false;
  idRubroArticulo!: number;
  resultado = '';
  constructor(
    private servicioRubroArticulo: RubroArticuloService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.idRubroArticulo = parametros['idRubroArticulo'];

      if (this.idRubroArticulo != 0) {
        servicioRubroArticulo
          .getArticuloInsumoEnBaseDatosXId(this.idRubroArticulo)
          .subscribe(
            (rubroEncontrado: any) =>
              (this.rubroArticulo = rubroEncontrado as RubroArticulo)
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
      idRubroArticulo: 0,
      descripcion: '',
    });
  }
  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.servicioRubroArticulo.guardarPOST(this.rubroArticulo);
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/rubrosArticulos']);
  }
}
