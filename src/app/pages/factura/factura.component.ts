import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm, FormsModule } from '@angular/forms';
import { PedidoDto } from '../../entidades/dto/PedidoDto';
import { Usuario } from 'src/app/entidades/Usuario';
import { FacturaServicio } from 'src/app/servicios/factura.servicio';
import { Factura } from 'src/app/entidades/Factura';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  factura: Factura = {
    idFactura: 0,
    fechaFactura: '',
    numeroFactura: 0,
    porcentajeDescuento: 0,
    totalVenta: 0,
    totalCosto: 0,
    bajaFactura: false,
  };
  facturas: Factura[] = [];
  usuario: Usuario = {
    idUsuario: 0,
    nombres: '',
    apellidos: '',
    clave: '',
    email: '',
    usuario: '',
    telefono: 0,
    rol: '',
    domicilios: [],
    bajaUsuario: false,
  };
  rol: string | null = '';
  usuarioLocal: string | null = '';
  loading = true;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private servFactura: FacturaServicio
  ) {
    this.rol = localStorage.getItem('rol');
    this.usuarioLocal = localStorage.getItem('usuario');
  }
  ngOnInit(): void {
    this.servFactura.getFacturasFromDataBase().subscribe((data) => {
      console.log(data);
      for (let facturaDb in data) {
        console.log(data[facturaDb]);
        this.facturas.push(data[facturaDb]);
      }
      this.loading = false;
    });
  }
  delete(idFactura: number) {
    var opcion = confirm('Esta seguro que desea eliminar la factura?');
    if (opcion == true) {
      this.servFactura.deleteFacturaFetch(idFactura);
      location.reload();
    }
  }

  verDetalle(idx: number) {

    this.router.navigate(['/admin/detalleFactura', idx]);
  }
}
