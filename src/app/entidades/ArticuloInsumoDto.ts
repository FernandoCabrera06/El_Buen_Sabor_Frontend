import { PrecioArticuloInsumo } from './PrecioArticuloInsumo';
import { RubroArticulo } from './RubroArticulo';

export class ArticuloInsumoDto {
  idArticuloInsumo: number = 0;
  denominacionArticuloInsumo: string = '';
  imagenArticuloInsumo: string = '';
  stockActual: number = 0;
  stockMinimo: number = 0;
  unidadMedidaArticuloInsumo: string = '';
  esArticuloInsumo: boolean = true;
  bajaArticuloInsumo: boolean = true;
  preciosArticulosInsumo: PrecioArticuloInsumo[] = [];
  rubroArticulo: RubroArticulo = new RubroArticulo();
}
