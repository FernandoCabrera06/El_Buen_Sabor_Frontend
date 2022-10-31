import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloManufacturado } from '../entidades/ArticuloManufacturado';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticuloMFRubroDto } from '../entidades/ArticuloMFRubroDto';
import { RubroGeneral } from '../entidades/RubroGeneral';

@Injectable({
  providedIn: 'root',
})
export class ManufacturadosService {
  public articulosData: ArticuloManufacturado[] = [];
  public articuloEncontrado: any;

  constructor(public http: HttpClient) {
    //console.log('Servicio Cargado!!!');
  }

  public getArticulosManufacturados(): any[] {
    return this.articulosData;
  }

  public getArticuloManufacturadoXId(idx: number): any {
    for (let articulo of this.articulosData) {
      if (articulo.idArticuloManufacturado == idx) {
        return articulo;
      }
    }
  }

  //lee todos los articulos Manufacturados
  getArticulosManufacturadosFromDataBase(): Observable<
    ArticuloManufacturado[]
  > {
    return this.http.get<ArticuloManufacturado[]>(
      'http://localhost:8080/articuloManufacturado/listarArticuloManufacturados'
    );
  }
  //lee todos los articulos Manufacturados CON RUBROS
  getArticulosMFRubrosFromDataBase(): Observable<ArticuloMFRubroDto[]> {
    return this.http.get<ArticuloMFRubroDto[]>(
      'http://localhost:8080/articuloManufacturado/listarArticuloManufacturadosRubros'
    );
  }

  //busca un articulo Manufacturado por el id
  getArticuloManufacturadoEnBaseDatosXId(idx: number) {
    return this.http
      .get(
        'http://localhost:8080/articuloManufacturado/listarArticuloManufacturadoXId/' +
          idx
      )
      .pipe(map((articuloEncontrado) => articuloEncontrado));
  }

  //baja logica de un articulo manufacturado
  async deleteArticuloManufacturadoFetch(idArticulo: number) {
    let urlServer =
      'http://localhost:8080/articuloManufacturado/borrarArticuloManufacturado/' +
      Number(idArticulo);
    let result = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
  }

  //guardar o actualizar un articulo Manufacturado
  async guardarPOST(
    articuloManufacturado: ArticuloMFRubroDto,
    idArticuloManufacturado: number
  ) {
    articuloManufacturado.rubroGeneral.idRubroGeneral = Number(
      articuloManufacturado.rubroGeneral.idRubroGeneral
    );
    let urlServer =
      'http://localhost:8080/articuloManufacturado/crearArticuloManufacturado';
    let method = 'POST';
    if (
      articuloManufacturado &&
      articuloManufacturado.idArticuloManufacturado > 0
    ) {
      urlServer =
        'http://localhost:8080/articuloManufacturado/modificarArticuloManufacturado/' +
        idArticuloManufacturado;
      method = 'PUT';
    }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(articuloManufacturado),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //lee el detalle de un articulos Manufacturado
  getDetalleArticuloManufacturadoEnBaseDatosXId(idx: string) {
    return this.http
      .get(
        'http://localhost:8080/articuloManufacturado/listarArticuloManuDetalleXId/' +
          idx
      )
      .pipe(map((articuloEncontrado) => articuloEncontrado));
  }

  getRubrosGeneralesFromDataBase(): Observable<RubroGeneral[]> {
    return this.http.get<RubroGeneral[]>(
      'http://localhost:8080/rubroGeneral/listarRubrosGenerales'
    );
  }
}
//listarArticuloManufacturadoXId  revisar esto en el endpoint!
