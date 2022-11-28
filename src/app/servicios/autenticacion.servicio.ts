import { UsuarioServicio } from './usuario.servicio';
import { Usuario } from 'src/app/entidades/Usuario';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionServicio {
  usuarioLogin: any = {
    usuario: '',
    clave: '',
    rol: '',
  };
  constructor(
    private servicio: UsuarioServicio,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AngularFireAuth
  ) {}

  getLogin(usuario: string, clave: string) {
    this.servicio
      .getLoginUsuario(usuario, clave)
      .subscribe((usuarioEncontrado) => {
        localStorage.setItem('usuario', usuarioEncontrado.usuario);
        localStorage.setItem('rol', usuarioEncontrado.rol);
        window.location.reload();
        this.router.navigate(['/home']);
      });
  }

  logoutUser() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    window.location.reload();
    this.router.navigate(['/home']);
  }

  async loginGoogle() {
    try {
      return await this.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      alert('No se ha podido hacer el login correctamente. Error:' + error);
      return null;
    }
  }
  isAuth() {
    return this.auth.authState.pipe(map((autha) => autha));
  }
}
