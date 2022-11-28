import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../entidades/Usuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  public usuariosData: Usuario[] = [];
  public usuarioEncontrado: any;

  constructor(public http: HttpClient) {}

  public getUsuarios(): any[] {
    return this.usuariosData;
  }

  public getUsuarioXId(idx: number): any {
    for (let usuario of this.usuariosData) {
      if (usuario.idUsuario == idx) {
        return usuario;
      }
    }
  }

  //busca un usuario por el id
  getUsuarioEnBaseDatosXId(idx: number) {
    return this.http
      .get('http://localhost:8080/usuario/listarUsuarioXId/' + idx)
      .pipe(map((usuarioEncontrado) => usuarioEncontrado));
  }

  //login de un usuario
  getLoginUsuario(usuario: string, clave: string) {
    return this.http
      .get(
        'http://localhost:8080/usuario/login?usuario=' +
          usuario +
          '&clave=' +
          clave
      )
      .pipe(map((usuarioEncontrado) => usuarioEncontrado as Usuario));
  }

  //baja logica de un usuario
  async deleteUsuarioFetch(idUsuario: number) {
    let urlServer = 'http://localhost:8080/usuario/borrarUsuario/' + idUsuario;

    let result = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
  }

  //guardar o actualizar usuario
  async guardarPOST(usuario: Usuario) {
    let urlServer = 'http://localhost:8080/usuario/crearUsuario';
    let method = 'POST';
    if (usuario && usuario.idUsuario > 0) {
      urlServer = 'http://localhost:8080/usuario/modificarUsuario';
      method = 'PUT';
    }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getUsuarioEmpleadosFromDataBase(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      'http://localhost:8080/usuario/listarUsuariosEmpleados'
    );
  }

  //lee todos los usuarios
  getUsuariosFromDataBase(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      'http://localhost:8080/usuario/listarUsuarios'
    );
  }

  getUsuarioXnombreUsuarioFromDataBase(
    nombreUsuario: string | null
  ): Observable<Usuario> {
    return this.http.get<Usuario>(
      'http://localhost:8080/usuario/getUsuarioByNombreUsuario?nombreUsuario=' +
        nombreUsuario
    );
  }
}
