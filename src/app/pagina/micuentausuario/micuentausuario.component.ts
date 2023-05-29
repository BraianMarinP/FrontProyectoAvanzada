import { Component } from '@angular/core';
import { UsuarioGetDTO } from 'src/app/modelo/usuario-get-dto';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-micuentausuario',
  templateUrl: './micuentausuario.component.html',
  styleUrls: ['./micuentausuario.component.css']
})
export class MicuentausuarioComponent {
  usuario: UsuarioGetDTO;


  constructor(private usuarioService: UsuarioService, private tokenService: TokenService) {
    this.usuario = new UsuarioGetDTO;
    this.cargarUsuario();
  }

  public cargarUsuario() {
    const resultado = this.usuarioService.obtenerUsuarioCorreo(this.tokenService.getEmail());
    resultado.subscribe(element => {
      this.usuario = <UsuarioGetDTO>element.respuesta;
    });
  }

  public modificarInformacion(){
    const cate = this.usuarioService.actualizar(this.usuario);
    cate.subscribe(element => {
      console.log(element.estado + " " + element.error + " " + element.respuesta);
    });
    
  }

}
