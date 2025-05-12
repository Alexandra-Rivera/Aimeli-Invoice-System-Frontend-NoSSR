import { MetodoPagoDTO } from "../metodo-pago-DTO/metodo-pago-dto";
import { ProveedorDTO } from "../proveedor-DTO/proveedor-dto";

export interface FacturaCompras {
    id: number,
    fechaCompra: string;
    numeroFactura: string;
    metodoPagoDTO: MetodoPagoDTO;
    proveedorDTO: ProveedorDTO;
}
