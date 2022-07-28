import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/entidades/Rol';
import { RolesService } from 'src/app/servicios/roles.service';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.css'],
})
export class FormRolesComponent implements OnInit {
  rol: Rol = {
    idRol: 0,
    descripcion: '',
  };
  new = false;
  idRol!: number;
  resultado = '';

  constructor(
    private servicioRol: RolesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.idRol = parametros['idRol'];

      if (this.idRol != 0) {
        servicioRol
          .getRolEnBaseDatosXId(this.idRol)
          .subscribe((rolEncontrado: any) => (this.rol = rolEncontrado as Rol));
      } else {
        console.log('ES NUEVO');
      }
    });
  }

  ngOnInit(): void {}

  addNew(formu: NgForm) {
    this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      idRol: 0,
      descripcion: '',
    });
  }

  validarSiNumero(numero: string): boolean {
    if (!/^([0-9])*$/.test(numero)) return false;
    return true;
  }

  async guardarPOST() {
    this.servicioRol.guardarPOST(this.rol);
    this.resultado = 'Operación finalizada, verifique los datos';
    this.router.navigate(['admin/roles']);
  }
}
