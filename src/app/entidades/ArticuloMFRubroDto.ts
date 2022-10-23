import { ArticuloManufacturadoDetalle } from './ArticuloManufacturadoDetalle';
import { PrecioArticuloManufacturado } from './PrecioArticuloManufacturado';
import { RubroGeneral } from './RubroGeneral';

export class ArticuloMFRubroDto {
  idArticuloManufacturado: number = 0;
  tiempoEstimadoCocina: number = 0;
  denominacionArticuloManu: string = '';
  imagenArticuloManu: string = '';
  preciosArticulosManufacturados: PrecioArticuloManufacturado[] = [];
  stock: number = 0;
  articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
  rubroGeneral: RubroGeneral = new RubroGeneral();
}
