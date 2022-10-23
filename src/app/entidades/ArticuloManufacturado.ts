import { ArticuloInsumo } from './ArticuloInsumo';
import { PrecioArticuloManufacturado } from './PrecioArticuloManufacturado';
import { RubroGeneral } from './RubroGeneral';

export class ArticuloManufacturado {
  idArticuloManufacturado: number = 0;
  tiempoEstimadoCocina: number = 0;
  denominacionArticuloManu: string = '';
  imagenArticuloManu: string = '';
  preciosArticulosManufacturados: PrecioArticuloManufacturado[] = [];
  stock: number = 0;
  insumos: string[] = [];
  rubroGeneral: RubroGeneral = new RubroGeneral();
}
