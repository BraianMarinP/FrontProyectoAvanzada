import { Component } from '@angular/core';
import { CarritoDTO } from 'src/app/modelo/carrito-dto';
import { CompraDTO } from 'src/app/modelo/compra-dto';
import { CompraProductoDTO } from 'src/app/modelo/compra-producto-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-carritocompra',
  templateUrl: './carritocompra.component.html',
  styleUrls: ['./carritocompra.component.css']
})
export class CarritocompraComponent {

  carrito: CarritoDTO | null;
  unidad: number;
  compraDTO: CompraDTO;
  medioPago: string;
  usuario: UsuarioGetDTO;
  valorTotal: number;

  unidadesMap: Map<number, number> = new Map<number, number>(); // Mapa para guardar el idPublicacion y la cantidad de unidades

  constructor(private carritoService: CarritoService, private usuarioService: UsuarioService, private tokenService: TokenService,
    private productoService: ProductoService) {
    this.carrito = this.carritoService.cargarCarrito();
    this.unidad = 1;
    this.compraDTO = new CompraDTO;
    this.medioPago = "";
    this.usuario = new UsuarioGetDTO;
    this.valorTotal = 0;
    this.cargarUsuario();
  }

  public cargarUsuario() {
    const resultado = this.usuarioService.obtenerUsuarioCorreo(this.tokenService.getEmail());
    resultado.subscribe(element => {
      this.usuario = <UsuarioGetDTO>element.respuesta;
    });
  }

  public eliminarDeCarrito(idPublicacion: number) {
    if (this.carrito) {
      const index = this.carrito.publicacionesProductosDTO.findIndex(element => element.idPublicacion === idPublicacion);
      if (index !== -1) {
        this.carrito.publicacionesProductosDTO.splice(index, 1);
        this.unidadesMap.delete(idPublicacion);
      }
      this.carritoService.guardarCarrito(this.carrito);
    }
  }

  public crearCompra() {
    this.compraDTO.codigoUsuario = this.usuario.cedula;
    this.compraDTO.valorTotal = this.valorTotal;

    for (const [clave, valor] of this.unidadesMap) {
      const compraProductoDTO = new CompraProductoDTO;
      compraProductoDTO.idPublicacion = clave;
      compraProductoDTO.cantidad = valor;
      this.compraDTO.productos.push(compraProductoDTO);
    }
    
    console.log(this.compraDTO.productos);

    this.productoService.comprarProducto(this.compraDTO).subscribe({
      next: data => {
        console.log(data.respuesta)
      },
      error: error => {
        console.log(error.error);
      }
    });
  }


  actualizarValorTotal(idPublicacion: number, unidades: number) {
    this.unidadesMap.set(idPublicacion, unidades);
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    this.valorTotal = 0;

    this.carrito?.publicacionesProductosDTO.forEach((item: any) => {
      const unidades = this.unidadesMap.get(item.idPublicacion);
      if (unidades) {
        const subtotal = item.precio * unidades;
        this.valorTotal += subtotal;
      }
    });
  }

}


