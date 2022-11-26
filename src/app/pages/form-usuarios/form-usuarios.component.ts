import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioServicio } from '../../servicios/usuario.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';
import { RolesService } from 'src/app/servicios/roles.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css'],
})
export class FormUsuariosComponent implements OnInit {
  usuario: Usuario = {
    idUsuario: 0,
    nombres: '',
    apellidos: '',
    clave: '',
    email: '',
    usuario: '',
    telefono: 0,
    rol: '',
    domicilios: [],
    bajaUsuario: false,
  };

  usuarios: Usuario[] = [];

  loading = true;
  seleccionado: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private serv: UsuarioServicio,
    private servicioRol: RolesService
  ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.usuario.idUsuario = parametros['idUsuario'];
    });
  }

  lista: string[] = [];

  ngOnInit(): void {
    if (this.usuario.idUsuario != 0) {
      this.serv
        .getUsuarioEnBaseDatosXId(this.usuario.idUsuario)
        .subscribe(
          (usuarioEncontrado: any) =>
            (this.usuario = usuarioEncontrado as Usuario)
        );
    }
    this.servicioRol.getRolesStringFromDataBase().subscribe((data) => {
      for (let rolDB in data) {
        this.lista.push(data[rolDB]);
      }
    });
  }

  delete(idUsuario: number) {
    var opcion = confirm('Esta seguro que desea eliminar el usuario?');
    if (opcion == true) {
      this.serv.deleteUsuarioFetch(idUsuario);
      location.reload();
    }
  }
  addNew(formu: NgForm) {
    //this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      nombres: '',
      apellidos: '',
      clave: '',
      email: '',
      usuario: '',
      telefono: 0,
      rol: '',
      domicilios: [],
      bajaUsuario: false,
    });
  }
  async guardarPOST() {
    this.serv.guardarPOST(this.usuario);

    this.router.navigate(['usuarios']);
  }

  onSelect(rol: string) {
    this.usuario.rol = rol;
  }
}
