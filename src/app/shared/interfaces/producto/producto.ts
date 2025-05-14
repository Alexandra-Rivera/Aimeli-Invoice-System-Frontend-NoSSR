import { CategoriaDTO } from "../categoria-DTO/categoria-dto";

export interface Producto {
    id: number;
    imagen: string;
    nombre: string;
    descripcion: string;
    categoriaDTO: CategoriaDTO;
    cantidad: number;
    costoUnitario: number;
    precioVenta: number;
}
