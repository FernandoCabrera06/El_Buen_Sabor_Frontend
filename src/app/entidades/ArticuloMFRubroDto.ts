import { ArticuloManufacturadoDetalle } from './ArticuloManufacturadoDetalle';
import { PrecioArticuloManufacturado } from './PrecioArticuloManufacturado';
import { RubroGeneral } from './RubroGeneral';

export class ArticuloMFRubroDto {
  idArticuloManufacturado: number = 0;
  tiempoEstimadoCocina: number = 0;
  denominacionArticuloManu: string = '';
  imagenArticuloManu: string = '';
  bajaArticuloManu: boolean = false;
  stock: number = 0;
  preciosArticulosManufacturados: PrecioArticuloManufacturado[] = [];
  articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[] = [];
  rubroGeneral: RubroGeneral = new RubroGeneral();
}
