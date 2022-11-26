import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm, FormsModule } from '@angular/forms';
import { FacturaServicio } from 'src/app/servicios/factura.servicio';
import { Factura } from 'src/app/entidades/Factura';
import { Usuario } from 'src/app/entidades/Usuario';
import { UsuarioServicio } from '../../servicios/usuario.servicio';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Domicilio } from 'src/app/entidades/Domicilio';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
    domicilios: [new Domicilio()],
    bajaUsuario: false,
  };

  rol: string | null = '';
  usuarioRol: string | null = '';
  loading = true;
  idFactura = 0;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private servFactura: FacturaServicio,
    private servUsuario: UsuarioServicio
  ) {
    this.rol = localStorage.getItem('rol');
    this.usuarioRol = localStorage.getItem('usuario');
    this.activeRoute.params.subscribe((parametros) => {
      this.factura.idFactura = parametros['idFactura'];
    });
  }
  ngOnInit(): void {
    this.servFactura
      .getFacturaEnBaseDatosXId(this.factura.idFactura)
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
  downloadPDF() {
    /*const pdfDefinition:any={
      content:[
        {
          text:'Hola Mundo'
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();*/
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_factura_El_Buen_Sabor.pdf`);
      });
  }
}
