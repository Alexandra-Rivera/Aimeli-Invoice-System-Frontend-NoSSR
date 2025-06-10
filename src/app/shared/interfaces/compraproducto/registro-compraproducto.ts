export interface RegistroCompraproducto {
   totalElements: number, 
   totalPages: number, 
   first: boolean, 
   last: boolean, 
   size: number, 
   content: [
    {
        idCompra: number, 
        numeroFactura: string, 
        fechaCompra: number[],
        proveedor: string, 
        productos: string, 
        metodoPago: string, 
        total: number
    }
   ],
   number: number, 
   sort: {
    empty: boolean, 
    sorted: boolean, 
    unsorted: boolean
   }, 
   numberOfElements: number, 
   pageable: {
    offset: number, 
    sort: {
        empty: boolean,
        sorted: boolean, 
        unsorted: boolean
    },
    paged: boolean, 
    unpaged: boolean, 
    pageNumber: number, 
    pageSize: number
   },
   empty: boolean
}
