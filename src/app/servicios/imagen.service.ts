import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ImagenService {
    
    private imgURL = "http://backproyectoavanzada-production-ebab.up.railway.app/api/imagenes";

    constructor(private http: HttpClient) { }

    public subirImagenPublicacion(imagen: FormData): Observable<MensajeDTO> {
        return this.http.post<MensajeDTO>(`${this.imgURL}/upload/publicacion/${0}`, imagen);
    }
    public subirImagenUsuario(cedula: string, imagen: FormData): Observable<MensajeDTO> {
        return this.http.post<MensajeDTO>(`${this.imgURL}/upload/publicacion/${cedula}`, imagen);
    }
    public subirImagenModerador(cedula: string, imagen: FormData): Observable<MensajeDTO> {
        return this.http.post<MensajeDTO>(`${this.imgURL}/upload/publicacion/${cedula}`, imagen);
    }
    public eliminar(id: string): Observable<MensajeDTO> {
        return this.http.delete<MensajeDTO>(`${this.imgURL}/${id}`);
    }
}