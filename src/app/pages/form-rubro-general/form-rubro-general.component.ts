import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { RubroGeneralService } from 'src/app/servicios/rubro-general.service';

@Component({
  selector: 'app-form-rubro-general',
  templateUrl: './form-rubro-general.component.html',
  styleUrls: ['./form-rubro-general.component.css'],
})
export class FormRubroGeneralComponent implements OnInit {
  rubroGeneral: RubroGeneral = {
    idRubroGeneral: 0,
    denominacionRubroGeneral: '',
  };
  new = false;
  idRubroGeneral!: number;
  resultado = '';

  constructor(
    private servicioRubroGeneral: RubroGeneralService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.idRubroGeneral = parametros['idRubroGeneral'];

      if (this.idRubroGeneral != 0) {
        servicioRubroGeneral
          .getRubroGeneralEnBaseDatosXId(this.idRubroGeneral)
          .subscribe(
            (rubroEncontrado: any) =>
              (this.rubroGeneral = rubroEncontrado as RubroGeneral)
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
      idRubroGeneral: 0,
      descripcion: '',
    });
  }

  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.servicioRubroGeneral.guardarPOST(this.rubroGeneral);
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/rubrosGenerales']);
  }
}
