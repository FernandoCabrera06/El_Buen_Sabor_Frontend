import { ArticuloInsumo } from './ArticuloInsumo';
import { ArticuloManufacturado } from './ArticuloManufacturado';

export class ArticuloManufacturadoDetalle {
  idArticuloManufacturadoDetalle: number = 0;
  cantidadArticuloManuDetalle: number = 0;
  unidadMedidaArticuloManuDetalle: string = '';
  articuloInsumo: ArticuloInsumo = new ArticuloInsumo();
}
