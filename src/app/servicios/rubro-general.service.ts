import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RubroGeneral } from '../entidades/RubroGeneral';

@Injectable({
  providedIn: 'root',
})
export class RubroGeneralService {
  public rubrosData: RubroGeneral[] = [];
  public rubroEncontrado: any;

  constructor(public http: HttpClient) {
    console.log('Servicio Cargado!!!');
  }

  public getRubros(): any[] {
    return this.rubrosData;
    console.log(this.rubrosData);
  }

  public getRubroXId(idx: number): any {
    for (let rol of this.rubrosData) {
      if (rol.idRubroGeneral == idx) {
        return rol;
      }
    }
  }

  //lee todos los rubros generales
  getRubrosGeneralesFromDataBase(): Observable<RubroGeneral[]> {
    return this.http.get<RubroGeneral[]>('http://localhost:8080/listarRubroGenerales');
  }

  //busca un rubro general por el id
  getRubroGeneralEnBaseDatosXId(idx: number) {
    return this.http.get('http://localhost:8080/listarRubroGeneralXId/' + idx);
  }

  //baja logica de un rubro general
  async deleteRubroGeneralFetch(idx: number) {
    let urlServer = 'http://localhost:8080/borrarRubroGeneral/' + idx;
    console.log(urlServer);
    let result = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
  }

  //guardar o actualizar un rubro general
  async guardarPOST(rubro: RubroGeneral) {
    rubro.idRubroGeneral = Number(rubro.idRubroGeneral);
    let urlServer = 'http://localhost:8080/crearRubroGeneral';
    let method = 'POST';
    if (rubro && rubro.idRubroGeneral > 0) {
      urlServer = 'http://localhost:8080/modificarRubroGeneral';
      method = 'PUT';
    }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(rubro),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
