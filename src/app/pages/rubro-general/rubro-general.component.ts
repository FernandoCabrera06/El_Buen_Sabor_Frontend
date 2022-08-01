import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RubroGeneral } from 'src/app/entidades/RubroGeneral';
import { RubroGeneralService } from 'src/app/servicios/rubro-general.service';

@Component({
  selector: 'app-rubro-general',
  templateUrl: './rubro-general.component.html',
  styleUrls: ['./rubro-general.component.css']
})
export class RubroGeneralComponent implements OnInit {
  rubros:RubroGeneral[] = [];
  loading= true;

  constructor(private servicioRubroGeneral:RubroGeneralService,private router: Router,
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
  }

  delete(idRubroGeneral: number) {
    var opcion = confirm('Esta seguro que desea eliminar el rubro general?');
    if (opcion === true) {
      this.servicioRubroGeneral.deleteRubroGeneralFetch(idRubroGeneral);
      location.reload();
    }
  }
}
