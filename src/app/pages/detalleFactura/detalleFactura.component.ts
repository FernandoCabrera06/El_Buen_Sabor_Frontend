import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm, FormsModule } from '@angular/forms';
import { FacturaServicio } from 'src/app/servicios/factura.servicio';
import { Factura } from 'src/app/entidades/Factura';
import { Usuario } from 'src/app/entidades/Usuario';
import { UsuarioServicio } from '../../servicios/usuario.servicio';
import { Injectable } from '@angular/core';
//import pdfMake from 'pdfMake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalleFactura',
  templateUrl: './detalleFactura.component.html',
  styleUrls: ['./detalleFactura.component.css'],
})
export class DetalleFacturaComponent implements OnInit {
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
  usuarioRol: string | null = '';
  loading = true;
  idPedido = 0;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private servFactura: FacturaServicio,
    private servUsuario: UsuarioServicio
  ) {
    this.rol = localStorage.getItem('rol');
    this.usuarioRol = localStorage.getItem('usuario');
    this.activeRoute.params.subscribe((parametros) => {
      this.idPedido = parametros['idPedido'];
    });
  }
  ngOnInit(): void {
    this.servFactura
      .getFacturaPorIdPedidoFromDataBase(this.idPedido)
      .subscribe(
        (facturaEncontrada: any) =>
          (this.factura = facturaEncontrada as Factura)
      );

    this.servUsuario
      .getUsuarioXnombreUsuarioFromDataBase(this.usuarioRol)
      .subscribe(
        (usuarioEncontrado: any) =>
          (this.usuario = usuarioEncontrado as Usuario)
      );
  }
  /*createPdf(){
     const pdfDefinition:any= {
      content:[
        {

        }
      ]
     }
     const pdf = pdfMake.createPdf(pdfDefinition);
     pdf.download();
  }*/
}
