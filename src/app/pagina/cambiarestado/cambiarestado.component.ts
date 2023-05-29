import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-cambiarestado',
  templateUrl: './cambiarestado.component.html',
  styleUrls: ['./cambiarestado.component.css']
})
export class CambiarestadoComponent {
  publicacionProductosDTO: PublicacionProductoDTO[];
  publicacionProductoDTO: PublicacionProductoDTO;
  
  constructor(private productoServicio: ProductoService, private router: Router) {
    this.publicacionProductoDTO = new PublicacionProductoDTO;

    this.publicacionProductosDTO = [];
    this.listarEstado("INACTIVO");
    
  }

  private cargarPublicaciones(){
    const cate = this.productoServicio.listar();
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        this.publicacionProductosDTO.push(publicacion);
      });
    });
  }

   private listarEstado(estado: string){
    const cate = this.productoServicio.listarEstado(estado);
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        this.publicacionProductosDTO.push(publicacion);
      });
    });
   }
  
  public cambiarEstado(idPublicacion: number, estado: string) {
    const cate = this.productoServicio.cambiarEstado(idPublicacion, estado);
    
    this.productoServicio.cambiarEstado(idPublicacion, estado).subscribe({
      next: data => {
        location.reload();
        console.log(data.respuesta);
      },
      error: error => {
        console.log(error.error);
      }
    });
  }
}
