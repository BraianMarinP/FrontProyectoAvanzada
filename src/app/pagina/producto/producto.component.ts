import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoDTO } from 'src/app/modelo/carrito-dto';
import { ComentarioDTO } from 'src/app/modelo/comentario-dto';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  publicacionProductoDTO: PublicacionProductoDTO;
  idPublicacionBuscada: number;
  comentarios:ComentarioDTO[];
  carrito: CarritoDTO  | null;
  comentarioTexto: string;
  calificacion: number = 1;
  usuarioGetDTO: UsuarioGetDTO;


  constructor(private productoService: ProductoService, private route:ActivatedRoute, 
    private carritoService: CarritoService, private usuarioService: UsuarioService, private tokenService: TokenService){



    this.publicacionProductoDTO = new PublicacionProductoDTO;
    this.idPublicacionBuscada = -1;
    this.comentarios = [];
    this.carrito = this.carritoService.cargarCarrito();
    this.comentarioTexto = "";
    this.calificacion = 1;
    this.usuarioGetDTO = new UsuarioGetDTO;
    

    this.route.params.subscribe(params => {
      this.idPublicacionBuscada = params['idPublicacion'];
      this.listarComentarios(params['idPublicacion']);
      console.log(params['idPublicacion']);
      this.cargarUsuario();
    });
    this.detalleProducto();
    
  }

  public detalleProducto(){
    //const cate = this.productoService.obtenerPublicacion(this.idPublicacionBuscada);

    const cate = this.productoService.obtenerPublicacion(this.idPublicacionBuscada);
    cate.subscribe(element => {
      const publicacionDTO: PublicacionProductoDTO = <PublicacionProductoDTO>element.respuesta;
      this.publicacionProductoDTO = publicacionDTO;
      console.log(this.publicacionProductoDTO.idImagenes);
    });
  }

  public cargarUsuario() {
    const resultado = this.usuarioService.obtenerUsuarioCorreo(this.tokenService.getEmail());
    resultado.subscribe(element => {
      this.usuarioGetDTO = <UsuarioGetDTO>element.respuesta;
      console.log(this.usuarioGetDTO);
    });
  }

  agregarAlCarrito(PublicacionProductoDTO: PublicacionProductoDTO): void {
    let yaContiene = false;
    if (this.carrito) {
      this.carrito.publicacionesProductosDTO.forEach(element => {
        if(element.idPublicacion === this.publicacionProductoDTO.idPublicacion){
          yaContiene = true;
        }
      });
      if(yaContiene === false){
        this.carrito.publicacionesProductosDTO.push(PublicacionProductoDTO);
        this.carritoService.guardarCarrito(this.carrito);
      }
    }else{
      this.carrito = this.carritoService.crearCarrito();
      this.carrito.publicacionesProductosDTO.push(PublicacionProductoDTO);
      this.carritoService.guardarCarrito(this.carrito);
    }
  }

  public listarComentarios(id: number){
      const cate = this.productoService.listarComentarios(id);
      cate.subscribe(element => {
        console.log(id);
        element.respuesta.forEach((comentario: ComentarioDTO) => {
          this.comentarios.push(comentario);
        });
      });
  }

  getStarClass(starNumber: number) {
    return starNumber <= this.calificacion ? 'fa fa-star' : 'fa fa-star-o';
  }

  public agregarFavorito(){
    this.productoService.agregarFavorito(this.usuarioGetDTO.cedula, this.idPublicacionBuscada).subscribe({
      next: data => {
        console.log(data.respuesta);
      },
      error: error => {
        console.log(error.error);
      }
    });
  }

  public agregarComentario(){
    console.log(this.comentarioTexto);
    const comentarioDTO = new ComentarioDTO;
    comentarioDTO.descripcion = this.comentarioTexto;
    comentarioDTO.cedulaUsuario = this.usuarioGetDTO.cedula;
    comentarioDTO.idPublicacion = this.idPublicacionBuscada;
    comentarioDTO.puntuacion = this.calificacion;

    this.productoService.creaComentario(comentarioDTO).subscribe({
      next: data => {
        console.log(data.respuesta);
        location.reload();
      },
      error: error => {
        console.log(error.error);
      }
    });
  }
}
