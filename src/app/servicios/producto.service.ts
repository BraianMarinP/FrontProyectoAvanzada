import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable, map } from 'rxjs';
import { PublicacionProductoDTO } from '../modelo/publicacion-producto-dto';
import { TokenService } from './token.service';
import { CompraDTO } from '../modelo/compra-dto';
import { CompraRequestDTO } from '../modelo/compra-request-dto';
import { ComentarioDTO } from '../modelo/comentario-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private catURL = "http://localhost:8080/api/usuarios";
  private caURL = "http://localhost:8080/api/moderadores";

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public crear(cedulaUsuario: string, publicacionProductoDTO: PublicacionProductoDTO): Observable<MensajeDTO>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<MensajeDTO>(`${this.catURL}/crearPublicacion/${cedulaUsuario}`, publicacionProductoDTO, { headers });
  }


  public listar(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.catURL}/Publicaciones/listar`);
  }

  public obtenerMisPublicaciones(cedula: string): Observable<MensajeDTO> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<MensajeDTO>(`${this.catURL}/misPublicaciones/obtener/${cedula}`, { headers });
  }

  

  public listarCategoria(categoria: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.catURL}/Publicaciones/listarCategoria/${categoria}`);
  }

  public obtenerPublicacion(idPublicacion: Number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.catURL}/Publicaciones/detallePublicacion/${idPublicacion}`);
  }

  public cargarMisFavoritos(cedula: string): Observable<MensajeDTO> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<MensajeDTO>(`${this.catURL}/Publicaciones/listarMisFavoritos/${cedula}`, { headers });
  }

  public eliminarPublicacionFavoritos(cedula: string, idPublicacion: Number): Observable<MensajeDTO> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<MensajeDTO>(`${this.catURL}/Publicaciones/eliminarFavorito/${cedula}/${idPublicacion}`, { headers });
  }

  public obtenerMisCompras(cedula: string){
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<MensajeDTO>(`${this.catURL}/misCompras/obtener/${cedula}`, { headers });
  }

  public eliminarMiPublicacion(cedula: String, idPublicacion:Number):Observable<MensajeDTO>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete<MensajeDTO>(`${this.catURL}/misPublicaciones/eliminar/${idPublicacion}`, { headers });
  }

  public actualizarMiPublicacion(idPublicacion:Number, idProducto:Number, publicacionProductoDTO: PublicacionProductoDTO):Observable<MensajeDTO>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<MensajeDTO>(`${this.catURL}/misPublicaciones/modificar/${idPublicacion}/${idProducto} `, publicacionProductoDTO, { headers });
  }

  public comprarProducto(compraDTO: CompraDTO):Observable<MensajeDTO>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<MensajeDTO>(`${this.catURL}/Comprar`, compraDTO, { headers });
  }

  

  public listarComentarios(idPublicacion: number):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.catURL}/Publicaciones/listarComentarios/${idPublicacion}`);
  }

  public creaComentario(comentarioDTO: ComentarioDTO):Observable<MensajeDTO>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<MensajeDTO>(`${this.catURL}/Publicaciones/crearComentario`, comentarioDTO, { headers });
  }

  public agregarFavorito(cedula: string, idPublicacion: number):Observable<MensajeDTO>{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<MensajeDTO>(`${this.catURL}/Publicaciones/agregarFavorito/${cedula}/${idPublicacion}`, { headers });
  }

  public listarEstado(estado: string) {
    return this.http.get<MensajeDTO>(`${this.caURL}/listarEstado/${estado}`);

  }

  public cambiarEstado(idPublicacion: number, estado: string) {
    
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<MensajeDTO>(`${this.caURL}/cambiarEstado/${idPublicacion}/${estado}`, { headers });

  }

}
