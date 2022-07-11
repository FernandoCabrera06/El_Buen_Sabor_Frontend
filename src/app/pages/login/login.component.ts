import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AutenticacionServicio } from '../../servicios/autenticacion.servicio';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../entidades/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{


  user: Usuario = {
    idUsuario:0,
    nombres:  "",
    apellidos: "",
    clave: "",
    email:  "",
    usuario: "",
    telelfono:0,
    rol:"",
    bajaUsuario:false

  };

  usuario: string = '';
  clave: string = '';

  constructor( private router: Router, private serv: AutenticacionServicio,private activeRoute:ActivatedRoute) { }


  ngOnInit(): void {
  }

  onLogin() {

    this.serv.getLogin(this.user.usuario, this.user.clave)

    this.router.navigate(['/']);
  }

  setActivo(){
    localStorage.setItem('logueado', 'false');
  }

  addNew(formu: NgForm) {
    this.router.navigate(['/', 'nuevo']);
    formu.reset({
      idUsuario:0,
    nombres:  "",
    apellidos: "",
    clave: "",
    email:  "",
    usuario: "",
    telelfono:0,
    rol:"",
    bajaUsuario:false
    });
  }

  /*redireccion(){
    this.serv.isAuth().subscribe((user: any) => {
      if (user) {
        console.log("El user es : ", user);
        localStorage.setItem('email', user.email);
        this.clienServ.getUser(user.email).subscribe( (data: any) => {
          console.log(data);
           localStorage.setItem('rol', data.rol.descripcion);
           this.setActivo();
           if (user.emailVerified) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/user/verificacion']);
          }

        }, () =>{
        });

      }
    });

  }*/

}
