import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloManufacturadoDetalle } from '../entidades/ArticuloManufacturadoDetalle';

@Injectable({
  providedIn: 'root',
})
export class DetalleManufacturadoService {
  constructor(public http: HttpClient) {}

  getArtMfDetalleEnBaseDatosXId(idx: number) {
    return this.http.get(
      'http://localhost:8080/artMfDetalle/listarArticuloManuDetalleXId/' + idx
    );
  }

  //guardar o actualizar un articulo Manufacturado
  async guardarPOST(
    articuloManuDetalle: ArticuloManufacturadoDetalle,
    idArticuloManufacturadoDetalle: number
  ) {
    let urlServer =
      'http://localhost:8080/artMfDetalle/crearArticuloManuDetalle';
    let method = 'POST';
    if (
      articuloManuDetalle &&
      articuloManuDetalle.idArticuloManufacturadoDetalle > 0
    ) {
      urlServer =
        'http://localhost:8080/artMfDetalle/modificarArticuloManuDetalle/' +
        idArticuloManufacturadoDetalle;
      method = 'PUT';
    }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(articuloManuDetalle),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
