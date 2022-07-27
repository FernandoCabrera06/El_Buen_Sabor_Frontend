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

  constructor(public http: HttpClient) {
    console.log('Servicio Cargado!!!');
  }

  public getRoles(): any[] {
    return this.rolesData;
    console.log(this.rolesData);
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

  //busca un rol por el id
  getRolEnBaseDatosXId(idx: string) {
    return this.http
      .get('http://localhost:8080/articuloManufacturado/listarRolXId/' + idx)
      .pipe(map((rolEncontrado) => rolEncontrado));
  }

  //baja logica de un rol
  async deleteRolFetch(idRol: number) {
    let urlServer = 'http://localhost:808/borrarRol/' + Number(idRol);
    console.log(urlServer);
    let result = await fetch(urlServer, {
      method: 'PUT',
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
      urlServer = 'http://localhost:8080/modificarRol';
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
