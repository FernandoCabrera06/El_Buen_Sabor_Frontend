import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Reporte } from 'src/app/entidades/dto/Reporte';
import { ProductosServicio } from 'src/app/servicios/productos.servicio';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { Bebida } from 'src/app/entidades/dto/BebidaDto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  articulo: ArticuloManufacturado = {
    idArticuloManufacturado: 0,
    tiempoEstimadoCocina: 0,
    denominacionArticuloManu: '',
    imagenArticuloManu: '',
    precioTotal: 0,
    stock: 0,
  };
  articulos: ArticuloManufacturado[] = [];

  bebida: Bebida = {
    idBebida: 0,
    nombreBebida: '',
    imagenBebida: '',
    precioTotal: 0,
    stock: 0,
  };
  bebidas: Bebida[] = [];

  loading = true;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private serv: ProductosServicio
  ) {}

  ngOnInit(): void {
    this.serv.getArticulosManufacturadosFromDataBase().subscribe((data) => {
      console.log(data);
      for (let articuloDB in data) {
        console.log(data[articuloDB]);
        this.articulos.push(data[articuloDB]);
      }
      this.loading = false;
    });

    this.serv.getBebidasFromDataBase().subscribe((dato) => {
      console.log(dato);
      for (let bebidaDb in dato) {
        console.log(dato[bebidaDb]);
        this.bebidas.push(dato[bebidaDb]);
      }
      this.loading = false;
    });
  }
}
