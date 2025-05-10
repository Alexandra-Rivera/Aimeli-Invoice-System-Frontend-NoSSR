import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Categoria } from '../../interfaces/categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServiceService {
  private server_Url = environment.API_URL;
  private http = inject(HttpClient);

  constructor() { }

  /*POST: Crear nueva categoria */
  crearCategoria(categoria: String): Observable<String> {
    return this.http.post<String>(`${this.server_Url}/categoria/${categoria}`, "no body");
  }

  /*PUT: Actualizar Categoria */
  actualizarCategoria(categoria: Categoria): Observable<String> {
   return this.http.put(`${this.server_Url}/categoria`, categoria, { responseType: 'text' });
  }

  /* GET ALL: Traer todas las Categorias*/
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.server_Url}/categoria`);
  }

  /* DELETE: Eliminar categoria por ID */
  eliminarCategoriaPorId(categoria_id: number): Observable<String> {
    return this.http.delete(`${this.server_Url}/categoria/${categoria_id}`, { responseType: 'text' });
  }

  /*FILTER: Filtrar categoria */
  filtrarCategoria(categoria: Categoria): Observable<any> {
    return this.http.get<any>(`${this.server_Url}/categoria/filter/${categoria}`);
  }
}
