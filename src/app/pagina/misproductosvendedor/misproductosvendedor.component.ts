import { Component } from '@angular/core';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misproductosvendedor',
  templateUrl: './misproductosvendedor.component.html',
  styleUrls: ['./misproductosvendedor.component.css']
})
export class MisproductosvendedorComponent {

  publicacionProductosDTO: PublicacionProductoDTO[];
  usuarioGetDTO: UsuarioGetDTO;

  constructor(private tokenService: TokenService, 
    private productoServicio: ProductoService, 
    private usuarioService: UsuarioService,
    private router: Router){

    this.publicacionProductosDTO = [];
    this.usuarioGetDTO = new UsuarioGetDTO;
    this.cargarUsuario();
  }

  private cargarMisPublicaciones(){
    const cate = this.productoServicio.obtenerMisPublicaciones(this.usuarioGetDTO.cedula);
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
      this.cargarMisPublicaciones();
    });
  }

  public eliminarMiPublicacion(idPublicacion: Number){
    const resultado = this.productoServicio.eliminarMiPublicacion(this.usuarioGetDTO.cedula, idPublicacion);
    resultado.subscribe(element => {
      console.log(element.respuesta);
    });
  }

  public editarMiPublicacion(idPublicacion: Number) {
    this.router.navigate(['/modificarproducto', idPublicacion]);
  }

}
