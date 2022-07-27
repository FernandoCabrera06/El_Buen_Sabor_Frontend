import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from 'src/app/entidades/Rol';
import { RolesService } from 'src/app/servicios/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  loading = true;

  constructor(
    private servicioRol: RolesService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.servicioRol.getRolesFromDataBase().subscribe((data) => {
      console.log(data);
      for (let rolDB in data) {
        console.log(data[rolDB]);
        this.roles.push(data[rolDB]);
      }
      this.loading = false;
    });
  }

  delete(idRol: number) {
    var opcion = confirm('Esta seguro que desea eliminar el rol?');
    if (opcion == true) {
      this.servicioRol.deleteRolFetch(idRol);
      location.reload();
    }
  }
}
