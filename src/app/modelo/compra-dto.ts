import { CompraProductoDTO } from "./compra-producto-dto";

export class CompraDTO {
    valorTotal:number=0;
    medioPago:string="";
    productos:CompraProductoDTO[]=[];
    codigoUsuario:string="";
    fecha: Date = new Date;
}
