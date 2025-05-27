import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductoCompleto } from '../../interfaces/producto/producto-completo';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  private http = inject(HttpClient);
  private server_url = environment.API_URL;

  constructor() { }

  /*GET ALL: Obtener todos los productos existentes INCOMPLETA */
  obtenerProductos(): Observable<ProductoCompleto[]> {
    return this.http.get<ProductoCompleto[]>(`${this.server_url}/producto`);
  }

  /*GET PRODUCTS BY CATEGORY ID: Obtener los productos segun la categoria */
  obtenerProductosSegunIdCategoria(catetogia_index: number): Observable<ProductoCompleto[]> {
    return this.http.get<ProductoCompleto[]>(`${this.server_url}/categoria/${catetogia_index}/producto`);
  }
}