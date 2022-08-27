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
      'http://localhost:8080/listarRubrosArticulos'
    );
  }

  //busca un rubro articulo por el id
  getArticuloInsumoEnBaseDatosXId(idx: number) {
    return this.http.get('http://localhost:8080/listarRubroArticuloXId/' + idx);
  }
}
