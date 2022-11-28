import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Rol } from '../entidades/Rol';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  public rolesData: Rol[] = [];
  public rolEncontrado: any;

  constructor(public http: HttpClient) {}

  public getRoles(): any[] {
    return this.rolesData;
  }

  public getRolXId(idx: number): any {
    for (let rol of this.rolesData) {
      if (rol.idRol == idx) {
        return rol;
      }
    }
  }

  //lee todos los roles
  getRolesFromDataBase(): Observable<Rol[]> {
    return this.http.get<Rol[]>('http://localhost:8080/listarRoles');
  }

  //lee todos los roles
  getRolesStringFromDataBase(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/listarRolesString');
  }

  //busca un rol por el id
  getRolEnBaseDatosXId(idx: number) {
    return this.http.get('http://localhost:8080/listarRolXId/' + idx);
    //.pipe(map((rolEncontrado) => rolEncontrado));
  }

  //baja logica de un rol
  async deleteRolFetch(idRol: number) {
    let urlServer = 'http://localhost:8080/borrarRol/' + idRol;
    let result = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
  }

  //guardar o actualizar un rol
  async guardarPOST(rol: Rol) {
    rol.idRol = Number(rol.idRol);
    let urlServer = 'http://localhost:8080/crearRol';
    let method = 'POST';
    if (rol && rol.idRol > 0) {
      urlServer = 'http://localhost:8080/modificarRol'; //tal vez falte poner + id
      method = 'PUT';
    }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(rol),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
