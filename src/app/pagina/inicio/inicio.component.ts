import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  tituloInicio: String;
  publicacionProductosDTO: PublicacionProductoDTO[];

  constructor(private productoServicio: ProductoService, private router: Router){
    this.tituloInicio = "Página de inicio.";
    this.publicacionProductosDTO = [];
    this.cargarPublicaciones();
  }

  private cargarPublicaciones(){
    const cate = this.productoServicio.listar();
    cate.subscribe(element => {
      element.respuesta.forEach((publicacion: PublicacionProductoDTO) => {
        this.publicacionProductosDTO.push(publicacion);
      });
    });
  }

  imprimirAlgo(){
    console.log("Algo algo algo");
  }

  public irDetallePublicacion(idPublicacion: Number){
    if(idPublicacion){
      this.router.navigate(["/producto", idPublicacion])
    }
  }

}
