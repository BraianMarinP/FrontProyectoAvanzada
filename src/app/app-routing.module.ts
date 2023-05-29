import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CategoriaComponent } from './pagina/categoria/categoria.component';
import { ProductoComponent } from './pagina/producto/producto.component';
import { CarritocompraComponent } from './pagina/carritocompra/carritocompra.component';
import { DetallesenvioComponent } from './pagina/detallesenvio/detallesenvio.component';
import { OpcionespagoComponent } from './pagina/opcionespago/opcionespago.component';
import { MicuentausuarioComponent } from './pagina/micuentausuario/micuentausuario.component';
import { MicuentamoderadorComponent } from './pagina/micuentamoderador/micuentamoderador.component';
import { HistorialcomprasComponent } from './pagina/historialcompras/historialcompras.component';
import { FavoritosComponent } from './pagina/favoritos/favoritos.component';
import { MisproductosvendedorComponent } from './pagina/misproductosvendedor/misproductosvendedor.component';
import { AprobacionproductosComponent } from './pagina/aprobacionproductos/aprobacionproductos.component';
import { AyudaComponent } from './pagina/ayuda/ayuda.component';
import { PublicarproductoComponent } from './pagina/publicarproducto/publicarproducto.component';
import { ModificarproductoComponent } from './pagina/modificarproducto/modificarproducto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { CambiarestadoComponent } from './pagina/cambiarestado/cambiarestado.component';
const routes: Routes = [
    { path: "", component: InicioComponent },
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
    { path: "categoria", component: CategoriaComponent },
    { path: "producto", component: ProductoComponent },
    { path: "carritocompra", component: CarritocompraComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] } },
    { path: "detallesenvio", component: DetallesenvioComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] } },
    { path: "opcionespago", component: OpcionespagoComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] } },
    { path: "micuentausuario", component: MicuentausuarioComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] } },
    { path: "micuentamoderador", component: MicuentamoderadorComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["MODERADOR"] } },
    { path: "aprobacionproductos", component: AprobacionproductosComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["MODERADOR"] } },
    { path: "historialcompras", component: HistorialcomprasComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] } },
    { path: "favoritos", component: FavoritosComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] } },
    { path: "ayuda", component: AyudaComponent },
    { path: "publicarproducto", component: PublicarproductoComponent, canActivate: [RolesGuard], data: {
        expectedRole: ["CLIENTE"] }  },
    { path: "modificarproducto/:idPublicacion", component: ModificarproductoComponent, canActivate: [RolesGuard], data: 
    { expectedRole: ["CLIENTE"] } },
    { path: "misproductosvendedor", component: MisproductosvendedorComponent, canActivate: [RolesGuard], data: 
    { expectedRole: ["CLIENTE"] } },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: "producto/:idPublicacion", component: ProductoComponent },
    { path: "cambiarestado", component: CambiarestadoComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["MODERADOR"] } },
    { path: "**", pathMatch: "full", redirectTo: "" }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
