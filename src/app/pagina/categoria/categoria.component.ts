import { Component } from '@angular/core';
import { CategoriaDTO } from 'src/app/modelo/categoria-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { FormsModule } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  categorias: string[];
  publicacionProductosDTO: PublicacionProductoDTO[];

  constructor(private productoServicio: ProductoService, private categoriaService: CategoriaService, private router: Router) {
    this.categorias = [];
    this.publicacionProductosDTO = [];
    this.cargarCategoria();
  }

  cargarCategoria() {
    const cate = this.categoriaService.listar();
    cate.subscribe(element => {
      element.respuesta.forEach((cate: CategoriaDTO) => {
        this.categorias.push(cate.nombre);
      });
    });
  }

  public cargarProductosCategoria(categoria: string){
    this.publicacionProductosDTO = [];
    const cate = this.productoServicio.listarCategoria(categoria);
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        this.publicacionProductosDTO.push(publicacion);
      });
    });
  }

  public irDetallePublicacion(idPublicacion: Number){
    if(idPublicacion){
      this.router.navigate(["/producto", idPublicacion])
    }
  }
  
}
