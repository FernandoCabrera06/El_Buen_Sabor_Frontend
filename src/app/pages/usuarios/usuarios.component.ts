import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioServicio } from '../../servicios/usuario.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';
import { Rol } from 'src/app/entidades/Rol';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  // usuario: Usuario = {
  //   idUsuario: 0,
  //   nombres: '',
  //   apellidos: '',
  //   clave: '',
  //   email: '',
  //   usuario: '',
  //   telefono: 0,
  //   rol: '',
  //   domicilios: [],
  //   bajaUsuario: false,
  // };

  usuarios: Usuario[] = [];
  loading = true;

  rol: string | null = '';
  nombreUsuario: string | null = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private servicioUsuario: UsuarioServicio
  ) {
    this.rol = localStorage.getItem('rol');
    this.nombreUsuario = localStorage.getItem('usuario');
  }

  ngOnInit(): void {
    this.servicioUsuario.getUsuarioEmpleadosFromDataBase().subscribe((data) => {
      console.log(data);
      for (let usarioDB in data) {
        console.log(data[usarioDB]);
        this.usuarios.push(data[usarioDB]);
      }
      this.loading = false;
    });
  }

  delete(idUsuario: number) {
    var opcion = confirm('Esta seguro que desea eliminar el usuario?');
    if (opcion == true) {
      this.servicioUsuario.deleteUsuarioFetch(idUsuario);
      location.reload();
    }
  }
  verDetalle(idx: number) {
    this.router.navigate(['/formUsuarios/', idx]);
  }
}
