import { UsuarioServicio } from './usuario.servicio';
import {Usuario} from 'src/app/entidades/Usuario';
import { Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AutenticacionServicio{
    usuarioLogin:any={
      usuario:"",
      clave:"",
      rol:""
    };
    constructor(private servicio: UsuarioServicio,private router: Router,private activeRoute:ActivatedRoute){}

    getLogin(usuario:string, clave:string){
        this.servicio.getLoginUsuario(usuario,clave)
        .subscribe(usuarioEncontrado =>{
            localStorage.setItem('usuario',usuarioEncontrado.usuario);
            localStorage.setItem('rol',usuarioEncontrado.rol);
            console.log(localStorage.getItem('usuario'));
            console.log(localStorage.getItem('rol'));
            window. location. reload();
            this.router.navigate(['/home']);
        });


    }

    logoutUser() {
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');
      window. location. reload();
      this.router.navigate(['/home']);
    }

}
