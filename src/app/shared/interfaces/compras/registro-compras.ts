import { Producto } from "../producto/producto";
import { FacturaCompras } from "./factura-compras";

export interface RegistroCompras {
    compra: FacturaCompras,
    productos: Producto[]
}
