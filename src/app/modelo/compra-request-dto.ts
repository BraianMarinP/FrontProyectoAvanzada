import { CompraDTO } from "./compra-dto";

export class CompraRequestDTO {
    compraDTO: CompraDTO = new CompraDTO;
    unidadesProducto: Map<number, number> = new Map;


}
