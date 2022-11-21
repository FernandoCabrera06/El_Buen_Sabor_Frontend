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
  lista:string[]=["Admin","Cajero","Cliente", "Cocinero","Delivery"];
  seleccionado:string="";
  constructor(private router: Router,private activeRoute:ActivatedRoute, private serv:UsuarioServicio ) {
    this.activeRoute.params.subscribe((parametros) => {
      this.usuario.idUsuario = parametros['idUsuario'];
    });

  }
  ngOnInit(): void {

    if(this.usuario.idUsuario!=0){
      this.serv
      .getUsuarioEnBaseDatosXId(this.usuario.idUsuario)
      .subscribe(
        (usuarioEncontrado: any) =>
          (this.usuario = usuarioEncontrado as Usuario)
      );
    }

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


    this.usuario.rol=this.seleccionado;
    this.serv.guardarPOST(this.usuario);

    this.router.navigate(['usuarios']);
  }

  onSelect(rol:string){
     this.usuario.rol = rol;
  }

}


