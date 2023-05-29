import { Component } from '@angular/core';
import { ModeradorDTO } from 'src/app/modelo/moderador-dto';
import { ModeradorService } from 'src/app/servicios/moderador.service';

@Component({
  selector: 'app-micuentamoderador',
  templateUrl: './micuentamoderador.component.html',
  styleUrls: ['./micuentamoderador.component.css']
})
export class MicuentamoderadorComponent {

  moderadorDTO: ModeradorDTO;
  constructor(private moderadorService: ModeradorService) {
    this.moderadorDTO = new ModeradorDTO;
    this.cargarModerador();
  }

  public cargarModerador() {
    const resultado = this.moderadorService.obtenerModerador("1234569");
    resultado.subscribe(element => {
      this.moderadorDTO = <ModeradorDTO>element.respuesta;
    });
  }
}
