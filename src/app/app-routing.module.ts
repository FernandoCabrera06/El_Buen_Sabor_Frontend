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
import { PedidosComponent } from './pages/Pedidos/pedidos.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { RubroGeneralComponent } from './pages/rubro-general/rubro-general.component';
import { RubroArticuloComponent } from './pages/rubro-articulo/rubro-articulo.component';
import { FormPedidosComponent } from './pages/form-pedidos/form-pedidos.component';
import { FormRubroGeneralComponent } from './pages/form-rubro-general/form-rubro-general.component';
import { FormRubroArticuloComponent } from './pages/form-rubro-articulo/form-rubro-articulo.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { DetalleFacturaComponent } from './pages/detalleFactura/detalleFactura.component';
import { ArticuloInsumoComponent } from './pages/articulo-insumo/articulo-insumo.component';
import { FormArticulosInsumosComponent } from './pages/form-articulos-insumos/form-articulos-insumos.component';

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
  { path: 'pedidoAprobado', component: PedidoAprobadoComponent },
  { path: 'admin/manufacturados', component: ManufacturadosComponent },
  {
    path: 'manufacturado/:idArticuloManufacturado',
    component: FormManufacturadosComponent,
  },
  {
    path: 'detalleManufacturado/:idArticuloManufacturado',
    component: DetalleProductoComponent,
  },
  { path: 'admin/roles', component: RolesComponent },
  { path: 'rol/:idRol', component: FormRolesComponent },
  { path: 'sobreNosotros', component: SobreElBuenSaborComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'formUsuarios/:idUsuario', component: FormUsuariosComponent },
  { path: 'admin/rubrosGenerales', component: RubroGeneralComponent },
  { path: 'admin/rubrosArticulos', component: RubroArticuloComponent },
  { path: 'formPedidos/:idPedido', component: FormPedidosComponent },
  {
    path: 'rubroGeneral/:idRubroGeneral',
    component: FormRubroGeneralComponent,
  },
  {
    path: 'rubroArticulo/:idRubroArticulo',
    component: FormRubroArticuloComponent,
  },
  { path: 'admin/factura', component: FacturaComponent },
  { path: 'detalleFactura/:idPedido', component: DetalleFacturaComponent },
  { path: 'admin/insumos', component: ArticuloInsumoComponent },
  {
    path: 'insumo/:idArticuloInsumo',
    component: FormArticulosInsumosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
