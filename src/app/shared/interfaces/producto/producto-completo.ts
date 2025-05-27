export interface ProductoCompleto {
    id: number;
    codigo: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    idCategoria: number;
    idProveedor: number;
    nombreProveedor: string;
    categoria: string;
    cantidad: number;
    costoUnitario: number;
    precioVenta: number;
}
