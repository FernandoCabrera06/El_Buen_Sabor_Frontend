import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RubroArticulo } from '../entidades/RubroArticulo';

@Injectable({
  providedIn: 'root',
})
export class RubroArticuloService {
  public rubrosArtData: RubroArticulo[] = [];
  public rubroArtEncontrado: any;

  constructor(public http: HttpClient) {}

  public getRubrosArticulo(): any[] {
    return this.rubrosArtData;
  }

  public getRubrosArticuloXId(idx: number): any {
    for (let rubroArt of this.rubrosArtData) {
      if (rubroArt.idRubroArticulo == idx) {
        return rubroArt;
      }
    }
  }

  //trae todos los rubros articulo de la DB
  getRubrosArticuloFromDataBase(): Observable<RubroArticulo[]> {
    return this.http.get<RubroArticulo[]>(
      'http://localhost:8080/rubroArticulo/listarRubrosArticulos'
    );
  }

  //busca un rubro articulo por el id
  getArticuloInsumoEnBaseDatosXId(idx: number) {
    return this.http.get(
      'http://localhost:8080/rubroArticulo/listarRubroArticuloXId/' + idx
    );
  }

  //baja logica de un rubro Artículo
  async deleteRubroArticuloFetch(idx: number) {
    let urlServer =
      'http://localhost:8080/rubroArticulo/borrarRubroArticulo/' + idx;
    let result = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
  }
  //guardar o actualizar un rubro Artículo
  async guardarPOST(rubro: RubroArticulo) {
    rubro.idRubroArticulo = Number(rubro.idRubroArticulo);
    let urlServer = 'http://localhost:8080/rubroArticulo/crearRubroArticulo';
    let method = 'POST';
    if (rubro && rubro.idRubroArticulo > 0) {
      urlServer = 'http://localhost:8080/rubroArticulo/modificarRubroArticulo';
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
