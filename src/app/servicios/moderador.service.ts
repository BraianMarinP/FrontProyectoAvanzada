import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {
  private modURL = "http://localhost:8080/api/moderadores";
  constructor(private http: HttpClient) { }
  
  public obtenerModerador(cedula: string): Observable<MensajeDTO> {
    console.log(cedula);
    return this.http.get<MensajeDTO>(`${this.modURL}/${cedula}`);
  }
}
