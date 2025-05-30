import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductoCompleto } from '../../interfaces/producto/producto-completo';
import { RespuestaInventarioPaginacion } from '../../interfaces/respuesta-servidor/respuesta-inventario-paginacion';
import { RespuestaServidor } from '../../interfaces/respuesta-servidor/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  private http = inject(HttpClient);
  private server_url = environment.API_URL;

  constructor() { }

  /*GET ALL PRODUCTS */
  obtenerTodosProductos(): Observable<ProductoCompleto[]> {
    return this.http.get<ProductoCompleto[]>(`${this.server_url}/producto`);
  }
  
  /*GET ALL BY PAGINATION: Obtener todos los productos existentes INCOMPLETA */
  obtenerProductos(numero_paginacion: number): Observable<RespuestaInventarioPaginacion> {
    const pagination_Data = new HttpParams()
      .set('page', numero_paginacion)
      .set('size', 10)
      
    return this.http.get<RespuestaInventarioPaginacion>(`${this.server_url}/producto/paginacion`, { params: pagination_Data });
  }

  /*GET PRODUCTS BY CATEGORY ID: Obtener los productos segun la categoria */
  obtenerProductosSegunIdCategoria(catetogia_index: number): Observable<ProductoCompleto[]> {
    return this.http.get<ProductoCompleto[]>(`${this.server_url}/categoria/${catetogia_index}/producto`);
  }

  /*GET PRODUCT BY ID: Obtiene producto por id */
  obtenerProductoSegunId(id: number): Observable<ProductoCompleto> {
    return this.http.get<ProductoCompleto>(`${this.server_url}/producto/${id}`);
  }

  /*UPDATE PRODUCT: Actualiza la informacion de un producto */
  actualizarInformacionProducto(producto: any, imagen: File): Observable<RespuestaServidor> {
    const product_data = new HttpParams()
    .set('id', producto.id)
    .set('codigo', producto.codigo)
    .set('nombre', producto.nombre)
    .set('descripcion', producto.descripcion)
    .set('cantidad', producto.cantidad)
    .set('precioVenta', producto.precioVenta)
    .set('costoUnitario', producto.costoUnitario) 
    .set('imagenURL', producto.imagenURL)
    .set('idCategoria', producto.idCategoria)
    .set('idProveedor', producto.idProveedor)
    
    const formData = new FormData();
    formData.append('imagen', imagen, imagen.type);

    return this.http.put<RespuestaServidor>(`${this.server_url}/producto`, formData, { params: product_data });
  }
}