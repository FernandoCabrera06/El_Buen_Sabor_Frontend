import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';
import { Carrito } from 'src/app/entidades/dto/CarritoDto';
import { Rol } from 'src/app/entidades/Rol';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Usuario = {
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
  carrito: Carrito = {
    id: 0,
    nombreProducto: '',
    cantidad: 0,
    precioProducto: 0,
    subTotal: 0,
    horasCocina: 0,
  };
  carritos: Carrito[] = [];

  usuario: string = '';
  clave: string = '';

  constructor(
    private router: Router,
    private serv: AutenticacionServicio,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    localStorage.setItem('carro', JSON.stringify(this.carritos));
  }

  onLogin() {
    this.serv.getLogin(this.user.usuario, this.user.clave);

    this.router.navigate(['/']);
  }

  setActivo() {
    localStorage.setItem('logueado', 'false');
  }

  onLoginGoogle() {
    this.serv
      .loginGoogle()
      .then((res: any) => {
        this.redireccionGoogle();
        window.location.reload();
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log('err ', err.message);
      });
  }

  addNew(formu: NgForm) {
    this.router.navigate(['/', 'nuevo']);
    formu.reset({
      idUsuario: 0,
      nombres: '',
      apellidos: '',
      clave: '',
      email: '',
      usuario: '',
      telefono: 0,
      rol: '',
      bajaUsuario: false,
    });
  }

  redireccionGoogle() {
    this.serv.isAuth().subscribe((user: any) => {
      if (user) {
        console.log('El user es : ', user);
        localStorage.setItem('usuario', user.email);
        localStorage.setItem('rol', 'cliente');
      }
    });
  }
}
