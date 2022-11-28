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

  constructor(public http: HttpClient) {}

  public getRubros(): any[] {
    return this.rubrosData;
  }

  public getRubroXId(idx: number): any {
    for (let rubro of this.rubrosData) {
      if (rubro.idRubroGeneral == idx) {
        return rubro;
      }
    }
  }

  //lee todos los rubros generales
  getRubrosGeneralesFromDataBase(): Observable<RubroGeneral[]> {
    return this.http.get<RubroGeneral[]>(
      'http://localhost:8080/rubroGeneral/listarRubrosGenerales'
    );
  }

  //busca un rubro general por el id
  getRubroGeneralEnBaseDatosXId(idx: number) {
    return this.http.get(
      'http://localhost:8080/rubroGeneral/listarRubroGeneralXId/' + idx
    );
  }

  //baja logica de un rubro general
  async deleteRubroGeneralFetch(idx: number) {
    let urlServer =
      'http://localhost:8080/rubroGeneral/borrarRubroGeneral/' + idx;
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
    let urlServer = 'http://localhost:8080/rubroGeneral/crearRubroGeneral';
    let method = 'POST';
    if (rubro && rubro.idRubroGeneral > 0) {
      urlServer = 'http://localhost:8080/rubroGeneral/modificarRubroGeneral';
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
