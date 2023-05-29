import { Component } from '@angular/core';
import { CompraDTO } from 'src/app/modelo/compra-dto';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-historialcompras',
  templateUrl: './historialcompras.component.html',
  styleUrls: ['./historialcompras.component.css']
})
export class HistorialcomprasComponent {


  usuario: UsuarioGetDTO;
  compras: CompraDTO[];
  nombresProductos: string[];

  constructor(private usuarioService: UsuarioService, private productoService: ProductoService, private tokenService: TokenService) {
    this.usuario = new UsuarioGetDTO;
    this.compras = [];
    this.nombresProductos = [];
    this.cargarUsuario();
  }

  public cargarUsuario() {
    const resultado = this.usuarioService.obtenerUsuarioCorreo(this.tokenService.getEmail());
    resultado.subscribe(element => {
      this.usuario = <UsuarioGetDTO>element.respuesta;
      this.obtenerMisCompras();
    });
  }

  public obtenerMisCompras() {
    const resultado = this.productoService.obtenerMisCompras(this.usuario.cedula);
    resultado.subscribe(element => {
      element.respuesta.forEach((compra: CompraDTO) => {
        this.compras.push(compra);
      });
    });
  }

  /* private obtenerProductosDeCompras() {
    this.compras.forEach(element => {
      const resultado = this.productoService.obtenerPublicacion(element.productos);
      array.forEach(element => {
        
      });
      resultado.subscribe(element => {
        element.respuesta.forEach((compra: CompraDTO) => {
          this.compras.push(compra);
        });
      });
    }); */
}


  /* private cargarNombresProductosComprados(idPublicacion: Number){
    const cate = this.productoService.obtenerPublicacion(idPublicacion);
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        this.nombresProductos.push(publicacion.producto.nombre);
      });
    });
  } */
