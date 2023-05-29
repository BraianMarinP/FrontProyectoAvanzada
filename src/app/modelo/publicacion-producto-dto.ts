import { ProductoDTO } from "./producto-dto";

export class PublicacionProductoDTO {
    idPublicacion:number=0;
    titulo:string="";
    precio:number=0;
    cantidad:number=0;
    idImagenes:string[]=[];
    producto:ProductoDTO = new ProductoDTO;
    creador:string="";
}
