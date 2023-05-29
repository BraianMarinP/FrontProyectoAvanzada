import { Component } from '@angular/core';
import { CategoriaDTO } from 'src/app/modelo/categoria-dto';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-publicarproducto',
  templateUrl: './publicarproducto.component.html',
  styleUrls: ['./publicarproducto.component.css']
})
export class PublicarproductoComponent {

  usuarioGetDTO: UsuarioGetDTO;
  producto: ProductoDTO;
  publicacionProducto: PublicacionProductoDTO;
  categorias: string[];
  archivos!: FileList;
  url: string;
  categoriasSeleccionadas: string[];

  constructor(private tokenService: TokenService, 
    private imagenService: ImagenService, 
    private categoriaService: CategoriaService, 
    private productoService: ProductoService,
    private usuarioService: UsuarioService) {

    this.categorias = [];
    this.categoriasSeleccionadas = [];
    this.producto = new ProductoDTO();
    this.publicacionProducto = new PublicacionProductoDTO();
    this.url = "";
    this.usuarioGetDTO = new UsuarioGetDTO;
    this.cargarCategoria();
    this.cargarUsuario();
  }

  private cargarCategoria() {
    const cate = this.categoriaService.listar();
    cate.subscribe(element => {
      element.respuesta.forEach((cate: CategoriaDTO) => {
        this.categorias.push(cate.nombre);
      });
    });
  }

  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.publicacionProducto;
      for (let i = 0; i < this.archivos.length; i++) {
        const formData = new FormData();
        formData.append('file', this.archivos[i]);
        this.imagenService.subirImagenPublicacion(formData).subscribe({
          next: data => {
            this.url = data.respuesta + "";
            console.log(this.url);
            this.publicacionProducto.idImagenes.push(this.url + "");
          },
          error: error => {
            console.log(error.error);
          }
        });
      }
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }

onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }

onCategoriaChange(event: any, item: string) {
    if (event.target.checked) {
        this.categoriasSeleccionadas.push(item); // Agrega la categoría al array si está seleccionada
    } else {
        const index = this.categoriasSeleccionadas.indexOf(item);
        if (index !== -1) {
            this.categoriasSeleccionadas.splice(index, 1); // Elimina la categoría del array si está deseleccionada
        }
    }

    console.log(this.categoriasSeleccionadas); // Muestra las categorías seleccionadas en el console.log
    // Realiza cualquier lógica adicional según sea necesario
}

public cargarUsuario() {
  const resultado = this.usuarioService.obtenerUsuarioCorreo(this.tokenService.getEmail());
  resultado.subscribe(element => {
    this.usuarioGetDTO = <UsuarioGetDTO>element.respuesta;
    console.log(this.usuarioGetDTO);
  });
}


  public crearProducto() {
    if(this.categoriasSeleccionadas.length > 0){
      this.categoriasSeleccionadas.forEach(element => {
        const cat = new CategoriaDTO;
        cat.nombre = element;
        this.publicacionProducto.producto.categorias.push(cat);
      });
    }
    if (this.publicacionProducto.idImagenes.length > 0) {
      this.productoService.crear(this.usuarioGetDTO.cedula, this.publicacionProducto).subscribe({
        next: data => {
          console.log(data.respuesta);
        },
        error: error => {
          console.log(error.error);
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }
}

