import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsuarioServicio } from '../../servicios/usuario.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';




@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent  implements OnInit{

  usuario: Usuario = {
    idUsuario: 0,
    nombres: "",
    apellidos: "",
    clave: "",
    email: "",
    usuario: "",
    telefono:0,
    rol:"",
    bajaUsuario:false
    };
    usuarios:Usuario[]=[];


  loading = true;

  constructor(private router: Router,private activeRoute:ActivatedRoute, private serv:UsuarioServicio ) {


  }
  ngOnInit(): void {

  }

  delete(idUsuario: number) {
    var opcion = confirm(
      'Esta seguro que desea eliminar el usuario?'
    );
    if (opcion == true) {
      this.serv.deleteUsuarioFetch(idUsuario);
      location.reload();
    }
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
      rol:""
    });
  }
  async guardarPOST() {

    alert(this.usuario.rol);
    this.serv.guardarPOST(this.usuario);

    this.router.navigate(['usuarios']);
  }

  onSelect(rol:string){
     this.usuario.rol = rol;
  }

}


