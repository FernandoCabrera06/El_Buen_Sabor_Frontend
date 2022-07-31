import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServicio } from '../../servicios/usuario.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent  implements OnInit{

  usuario: Usuario = {
    idUsuario: 0,
    nombres: "",
    apellidos: "",
    clave: "",
    email: "",
    usuario: "",
    telefono:0,
    rol:"Cliente",
    bajaUsuario:false
    }
  rol:string|null="";
  nombreUsuario:string|null="";
  loading = true;
  constructor(private router: Router,private activeRoute:ActivatedRoute, private serv:UsuarioServicio ) {
    this.rol = localStorage.getItem('rol');
    this.nombreUsuario = localStorage.getItem('usuario');
  }
  ngOnInit(): void {
  }
  addNew(formu: NgForm) {
    //this.router.navigate(['/admin', 'nuevo']);
    formu.reset({
      nombres: "",
      apellidos: "",
      clave: "",
      email: "",
      usuario: "",
      telefono:0,
    });
  }
  async guardarPOST() {
    this.serv.guardarPOST(this.usuario);
    this.router.navigate(['user/login']);
  }
}
