import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloInsumo } from '../entidades/ArticuloInsumo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloInsumoService {
  public insumosData: ArticuloInsumo[] = [];
  public insumoEncontrado: any;

  constructor(public http: HttpClient) { }



  public getArticulosInsumos(): any[] {
    return this.insumosData;
  }

  public getArticuloInsumoXId(idx: number): any {
    for (let insumo of this.insumosData) {
      if (insumo.idArticuloInsumo == idx) {
        return insumo;
      }
    }
  }

  //trae todos los articulos insumos de la DB
  getArticulosInsumoFromDataBase(): Observable<ArticuloInsumo[]> {
    return this.http.get<ArticuloInsumo[]>(
      'http://localhost:8080/articuloInsumo/listarArticulosInsumo'
    );
  }

  //busca un articulo insumo por el id
  getArticuloManufacturadoEnBaseDatosXId(idx: number) {
    return this.http.get(
      'http://localhost:8080/articuloInsumo/listarArticuloInsumoXId/' + idx
    );
  }

  //baja logica de un articulo insumo
  async deleteArticuloInsumoFetch(idInsumo: number) {
    let urlServer =
      'http://localhost:8080/articuloInsumo/borrarArticuloInsumo/' + Number(idInsumo);
    let result = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
  }

  //guardar o actualizar un articulo insumo
  async guardarPOST(articuloInsumo: ArticuloInsumo) {
    let urlServer =
      'http://localhost:8080/articuloInsumo/crearArticuloInsumo';
    let method = 'POST';

    if ( articuloInsumo && articuloInsumo.idArticuloInsumo > 0 ) {
      urlServer = 'http://localhost:8080/articuloInsumo/modificarArticuloInsumo';
      method = 'PUT';
    }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(articuloInsumo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

