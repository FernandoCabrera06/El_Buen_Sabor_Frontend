import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { IngresosComponent } from './pages/reportes/ingresos/ingresos.component';
import { GananciasComponent} from './pages/reportes/gananacias/gananacias.component';
import { PedidosPorUsuarioComponent } from './pages/reportes/pedidosPorUsuario/pedidosPorUsuario.component';
import { PedidosPorPeriodoComponent} from './pages/reportes/pedidosPorPeriodo/pedidosPorPeriodo.component';
import { DetalleProductoComponent } from './pages/detalleProducto/detalleProducto.component';


const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'catalogo', component: CatalogoComponent},
  //{path : '**', pathMatch: 'full', redirectTo: ''},
  {path : 'user/login', component: LoginComponent},
  {path : 'admin/ingresos', component: IngresosComponent},
  {path : 'admin/ganancias', component: GananciasComponent},
  {path: 'admin/pcliente', component : PedidosPorUsuarioComponent},
  {path: 'admin/maspedidas', component: PedidosPorPeriodoComponent},
  {path: 'detalle', component: DetalleProductoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
