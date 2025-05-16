export interface ProductoCompleto {
    id: number;
    codigo: string;
    imagen: string;
    nombre: string;
    descripcion: string;
    idCategoria: number;
    idProveedor: number;
    nombreProveedor: string;
    categoria: string;
    cantidad: number;
    costoUnitario: number;
    precioVenta: number;
}
