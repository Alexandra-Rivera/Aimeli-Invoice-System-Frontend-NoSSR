import { Producto } from "../producto/producto";
import { FacturaCompras } from "./factura-compras";

export interface RegistroCompras {
    id: number,
    compra: FacturaCompras,
    productos: Producto[]
}
