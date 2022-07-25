import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AutenticacionServicio } from './servicios/autenticacion.servicio';
import { IngresosComponent } from './pages/reportes/ingresos/ingresos.component';
import { GananciasComponent } from './pages/reportes/gananacias/gananacias.component';
import { PedidosPorUsuarioComponent } from './pages/reportes/pedidosPorUsuario/pedidosPorUsuario.component';
import { PedidosPorPeriodoComponent } from './pages/reportes/pedidosPorPeriodo/pedidosPorPeriodo.component';
import { ManufacturadosComponent } from './pages/manufacturados/manufacturados.component';
import { FormManufacturadosComponent } from './pages/form-manufacturados/form-manufacturados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CatalogoComponent,
    LoginComponent,
    IngresosComponent,
    GananciasComponent,
    PedidosPorUsuarioComponent,
    PedidosPorPeriodoComponent,
    ManufacturadosComponent,
    FormManufacturadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AutenticacionServicio],
  bootstrap: [AppComponent],
})
export class AppModule {}
