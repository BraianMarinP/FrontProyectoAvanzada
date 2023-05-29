import { CategoriaDTO } from "./categoria-dto";

export class ProductoDTO {
    id:number = 0 ;
    nombre:string = "";
    descripcion:string = "";
    categorias:CategoriaDTO[] = [];
}
