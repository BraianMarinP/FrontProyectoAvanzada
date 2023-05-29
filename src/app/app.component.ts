import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './servicios/token.service';
import { SesionService } from './servicios/sesion.service';
import { CarritoService } from './servicios/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'MoonMarket';
  isLogged = false;
  email: string = "";

  //private router:Router ;
  constructor(private router: Router, private tokenService: TokenService, private sesionService: SesionService,
    private carritoService: CarritoService) { }


  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }

  ngOnInit(): void {

    /* this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
    } */

    const objeto = this;
    this.sesionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());

  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.email = this.tokenService.getEmail();
    } else {
      this.email = "";
    }
  }


  public logout() {
    this.tokenService.logout();
    this.carritoService.borrarCarrito();
  }

}
