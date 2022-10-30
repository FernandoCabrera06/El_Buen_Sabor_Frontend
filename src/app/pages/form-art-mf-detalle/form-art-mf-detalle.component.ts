import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-art-mf-detalle',
  templateUrl: './form-art-mf-detalle.component.html',
  styleUrls: ['./form-art-mf-detalle.component.css'],
})
export class FormArtMfDetalleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.servicioInsumos.getArticulosInsumoFromDataBase().subscribe((data) => {
    //   for (let insumoGenDB in data) {
    //     if (data[insumoGenDB].esArticuloInsumo) {
    //       this.insumos.push(data[insumoGenDB]);
    //     }
    //   }
    // });
  }

  agregarArticulosMFDetalles() {
    this.displayStyle = 'none';
  }
  numero: number = 3;
  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }
  cancelPopup() {
    this.displayStyle = 'none';
  }
}
