import { ProductoCompleto } from "../producto/producto-completo";

export interface RespuestaInventarioPaginacion {
    content: ProductoCompleto[],
    pageable: {
        pageNumber: number, 
        pageSize: number, 
        sort: {
            empty: boolean, 
            sorted: boolean, 
            unsorted: boolean 
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    }, 
    last: boolean, 
    totalElements: number, 
    totalPages: number, 
    first: boolean, 
    size: number, 
    number: number, 
    sort : {
        empty: boolean,
        sorted: boolean, 
        unsorted: boolean
    },
    numberOfElements: number, 
    empty: false
}
