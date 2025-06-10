export interface Rol {
    id: number, 
    nombre: string, 
    permisos: [
        id: number, 
        nombre: string, 
        descripcion: string
    ]
}
