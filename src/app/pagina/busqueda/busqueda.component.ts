import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  textoBusqueda: string;
  publicacionProductosDTO: PublicacionProductoDTO[];
  filtro: PublicacionProductoDTO[];

  constructor(private route: ActivatedRoute, private productoServicio: ProductoService, private router: Router) {
    this.textoBusqueda = "";
    this.publicacionProductosDTO = [];
    this.filtro = [];
    this.cargarPublicaciones();

    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];
      console.log(this.textoBusqueda);
      this.filtro = this.publicacionProductosDTO.filter(publicacion =>
        publicacion.titulo.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    });

  }

  private cargarPublicaciones(){
    const cate = this.productoServicio.listar();
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        console.log(publicacion.idImagenes[0]);
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