import { ProductoVistaCompraproducto } from "../producto/producto-vista-compraproducto"

export interface CompraInformacion {
    compra: {
    id: number,
    fechaCompra: string,
    numeroFactura: string,
    idMetodoPago: number,
    metodoPago: string,
    idProveedor: number,
    proveedor: string
  },
  productos: ProductoVistaCompraproducto[]
}
