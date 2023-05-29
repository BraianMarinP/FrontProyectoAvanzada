import { Injectable } from '@angular/core';
import { CarritoDTO } from '../modelo/carrito-dto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito'; // Clave para almacenar el carrito en el localStorage

  constructor() { }

  crearCarrito(): CarritoDTO {
    const nuevoCarrito = new CarritoDTO;
    this.guardarCarrito(nuevoCarrito);
    return nuevoCarrito;
  }

  guardarCarrito(carrito: CarritoDTO): void {
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  cargarCarrito(): CarritoDTO | null {
    const carritoString = localStorage.getItem(this.carritoKey);
    if (carritoString) {
      return JSON.parse(carritoString);
    }
    return null;
  }

  borrarCarrito(){
    localStorage.removeItem(this.carritoKey);
  }

}
