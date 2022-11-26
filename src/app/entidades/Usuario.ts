import { Domicilio } from './Domicilio';

export class Usuario {
  idUsuario: number = 0;
  nombres: string = '';
  apellidos: string = '';
  clave: string = '';
  email: string = '';
  usuario: string = '';
  telefono: number = 0;
  rol: string = '';
  domicilios: Domicilio[] = [];
  bajaUsuario: boolean = false;
}
