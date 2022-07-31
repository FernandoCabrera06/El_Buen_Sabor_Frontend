import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { IngresosComponent } from './pages/reportes/ingresos/ingresos.component';
import { GananciasComponent } from './pages/reportes/gananacias/gananacias.component';
import { PedidosPorUsuarioComponent } from './pages/reportes/pedidosPorUsuario/pedidosPorUsuario.component';
import { PedidosPorPeriodoComponent } from './pages/reportes/pedidosPorPeriodo/pedidosPorPeriodo.component';
import { DetalleProductoComponent } from './pages/detalleProducto/detalleProducto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ManufacturadosComponent } from './pages/manufacturados/manufacturados.component';
import { FormManufacturadosComponent } from './pages/form-manufacturados/form-manufacturados.component';
import { RolesComponent } from './pages/roles/roles.component';
import { FormRolesComponent } from './pages/form-roles/form-roles.component';
import { SobreElBuenSaborComponent } from './pages/sobre-el-buen-sabor/sobre-el-buen-sabor.component';
import { PedidoAprobadoComponent } from './pages/pedidoAprobado/pedidoAprobado.component';
import {PedidosComponent} from './pages/Pedidos/pedidos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogo', component: CatalogoComponent },
  //{path : '**', pathMatch: 'full', redirectTo: ''},
  { path: 'user/login', component: LoginComponent },
  { path: 'admin/ingresos', component: IngresosComponent },
  { path: 'admin/ganancias', component: GananciasComponent },
  { path: 'admin/pcliente', component: PedidosPorUsuarioComponent },
  { path: 'admin/maspedidas', component: PedidosPorPeriodoComponent },
  { path: 'detalle', component: DetalleProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  {path: 'pedidoAprobado', component:PedidoAprobadoComponent},
  { path: 'admin/manufacturados', component: ManufacturadosComponent },
  {
    path: 'manufacturado/:idArticuloManufacturado',
    component: FormManufacturadosComponent,
  },
  {
    path: 'detalleManufacturado/:idArticuloManufacturado',
    component: DetalleProductoComponent,
  },
  {
    path: 'admin/roles',
    component: RolesComponent,
  },
  {
    path: 'rol/:idRol',
    component: FormRolesComponent,
  },
  {
    path: 'sobreNosotros',
    component: SobreElBuenSaborComponent,
  },
  { path: 'pedidos', component: PedidosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
