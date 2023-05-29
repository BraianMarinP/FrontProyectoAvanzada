/* import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component'; */

import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { PublicarproductoComponent } from './pagina/publicarproducto/publicarproducto.component';
import { CategoriaComponent } from './pagina/categoria/categoria.component';
import { ProductoComponent } from './pagina/producto/producto.component';
import { MicuentausuarioComponent } from './pagina/micuentausuario/micuentausuario.component';
import { MicuentamoderadorComponent } from './pagina/micuentamoderador/micuentamoderador.component';
import { AprobacionproductosComponent } from './pagina/aprobacionproductos/aprobacionproductos.component';
import { AyudaComponent } from './pagina/ayuda/ayuda.component';
import { CarritocompraComponent } from './pagina/carritocompra/carritocompra.component';
import { DetallesenvioComponent } from './pagina/detallesenvio/detallesenvio.component';
import { FavoritosComponent } from './pagina/favoritos/favoritos.component';
import { HistorialcomprasComponent } from './pagina/historialcompras/historialcompras.component';
import { MisproductosvendedorComponent } from './pagina/misproductosvendedor/misproductosvendedor.component';
import { ModificarproductoComponent } from './pagina/modificarproducto/modificarproducto.component';
import { OpcionespagoComponent } from './pagina/opcionespago/opcionespago.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { CambiarestadoComponent } from './pagina/cambiarestado/cambiarestado.component';




@NgModule({
    declarations: [
        AppComponent,
        InicioComponent,
        LoginComponent,
        RegistroComponent,
        BusquedaComponent,
        AlertaComponent,
        PublicarproductoComponent,
        CategoriaComponent,
        ProductoComponent,
        MicuentausuarioComponent,
        MicuentamoderadorComponent,
        AprobacionproductosComponent,
        AyudaComponent,
        CarritocompraComponent,
        DetallesenvioComponent,
        FavoritosComponent,
        HistorialcomprasComponent,
        MisproductosvendedorComponent,
        ModificarproductoComponent,
        OpcionespagoComponent,
        CarritocompraComponent,
        CambiarestadoComponent
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }