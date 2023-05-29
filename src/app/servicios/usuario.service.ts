import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { UsuarioGetDTO } from '../modelo/usuario-get-dto';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userUrl = "http://localhost:8080/api/usuarios";
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public obtener(cedula: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/${cedula}`);
  }

  public obtenerUsuarioCorreo(correo: string): Observable<MensajeDTO> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<MensajeDTO>(`${this.userUrl}/usuarioPorCorreo/${correo}`, { headers });
  }

  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/${codigo}`);
  }
  public actualizar(usuario: UsuarioGetDTO): Observable<MensajeDTO> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<MensajeDTO>(`${this.userUrl}/actualizar`, usuario, { headers });
  }
}
