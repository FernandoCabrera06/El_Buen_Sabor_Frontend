import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloManufacturado } from 'src/app/entidades/ArticuloManufacturado';
import { ArticuloMFRubroDto } from 'src/app/entidades/ArticuloMFRubroDto';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';
import { RubroGeneralService } from 'src/app/servicios/rubro-general.service';

@Component({
  selector: 'app-rubro-general',
  templateUrl: './rubro-general.component.html',
  styleUrls: ['./rubro-general.component.css']
})
export class RubroGeneralComponent implements OnInit {
  rubros:RubroGeneral[] = [];
  articulos: ArticuloMFRubroDto[] = [];
  loading= true;

  constructor(private servicioRubroGeneral:RubroGeneralService,private router: Router, private servicioManu: ManufacturadosService,
    private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.servicioRubroGeneral.getRubrosGeneralesFromDataBase().subscribe((data) => {
      console.log(data);
      for (let rubroDB in data) {
        console.log(data[rubroDB]);
        this.rubros.push(data[rubroDB]);
      }
      this.loading = false;
    });

    this.servicioManu
    .getArticulosMFRubrosFromDataBase()
    .subscribe((dataMF) => {
      console.log(dataMF);
      for (let articuloDBMF in dataMF) {
        console.log(dataMF[articuloDBMF]);
        this.articulos.push(dataMF[articuloDBMF]);
      }
      this.loading = false;
    });


  }

  delete(idRubroGeneral: number) {
    var opcion = confirm('Esta seguro que desea eliminar el rubro general?');
    if (opcion === true) {
      this.servicioRubroGeneral.deleteRubroGeneralFetch(idRubroGeneral);
      location.reload();
    }
  }
}
