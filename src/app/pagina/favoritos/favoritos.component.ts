import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  publicacionProductosDTO: PublicacionProductoDTO[];
  usuarioGetDTO: UsuarioGetDTO;

  constructor(private tokenService: TokenService, private productoServicio: ProductoService, 
    private usuarioService: UsuarioService, private router: Router){
    this.publicacionProductosDTO = [];
    this.usuarioGetDTO = new UsuarioGetDTO;
    this.cargarUsuario();
  }

  private cargarMisFavoritos(){
    const cate = this.productoServicio.cargarMisFavoritos(this.usuarioGetDTO.cedula);
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        this.publicacionProductosDTO.push(publicacion);
      });
    });
  }

  public cargarUsuario() {
    const resultado = this.usuarioService.obtenerUsuarioCorreo(this.tokenService.getEmail());
    resultado.subscribe(element => {
      this.usuarioGetDTO = <UsuarioGetDTO>element.respuesta;
      this.cargarMisFavoritos();
    });
  }

  public irDetallePublicacion(idPublicacion: Number){
    if(idPublicacion){
      this.router.navigate(["/producto", idPublicacion])
    }
  }

  public eliminarPublicacionFavoritos(idPublicacion: Number){
    const cate = this.productoServicio.eliminarPublicacionFavoritos(this.usuarioGetDTO.cedula, idPublicacion);
    cate.subscribe(element => {
      console.log(element.respuesta);
      location.reload();
    });
  }

}
