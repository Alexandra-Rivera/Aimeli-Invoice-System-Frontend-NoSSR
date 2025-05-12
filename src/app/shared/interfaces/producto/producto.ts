import { CategoriaDTO } from "../categoria-DTO/categoria-dto";

export interface Producto {
    id: number;
    imagenProducto: string;
    codigoProducto: string;
    nombreProducto: string;
    descripcionProducto: string;
    categoriaDTO: CategoriaDTO;
    costoUnitario: number;
    precioVenta: number;
}
