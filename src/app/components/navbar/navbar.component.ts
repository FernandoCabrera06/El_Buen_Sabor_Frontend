import { Component, OnInit } from '@angular/core';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logueado = false;
  rol: string | null = '';
  usuario: any;
  cantidadArticulos: number | undefined = 0;
  numItems: number = 0;
  constructor(private autenticacionServicio: AutenticacionServicio) {}

  ngOnInit(): void {
    this.getCurrentUser();
    if (localStorage.getItem('carro')?.split('}').length)
      this.cantidadArticulos = localStorage.getItem('carro')?.split('}').length;
    if (this.cantidadArticulos) this.numItems = this.cantidadArticulos - 1;
  }
  onLogout() {
    this.autenticacionServicio.logoutUser();
    console.log('salir');
  }

  getCurrentUser() {
    if (localStorage.getItem('usuario')) {
      this.logueado = true;
      this.rol = localStorage.getItem('rol');
    } else {
      this.logueado = false;
    }
  }
}
