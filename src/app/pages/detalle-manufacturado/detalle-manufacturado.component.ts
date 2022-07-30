import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleManufacturadoService } from 'src/app/servicios/detalle-manufacturado.service';

@Component({
  selector: 'app-detalle-manufacturado',
  templateUrl: './detalle-manufacturado.component.html',
  styleUrls: ['./detalle-manufacturado.component.css'],
})
export class DetalleManufacturadoComponent implements OnInit {
  loading = true;
  constructor() {}

  ngOnInit(): void {}
}
