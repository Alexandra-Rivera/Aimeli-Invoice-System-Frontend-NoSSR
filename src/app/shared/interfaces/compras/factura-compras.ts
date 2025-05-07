import { Producto } from "../producto/producto";

export interface FacturaCompras {
    fechaCompra: string;
    numeroFactura: string;
    metodoPago: string;
    proveedor: string;
    productos: Producto[];
}
