import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Cliente } from '../../interfaces/cliente/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor() { }
  protected http = inject(HttpClient);
  private server_url = environment.API_URL;

  /*Get all: Obtener todos los clientes */
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.server_url}/cliente`);
  }
  /*Post: Crear un nuevo cliente */
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.server_url}/cliente`, cliente);
  }
  /*Put: Actualizar un cliente */
  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.server_url}/cliente`, cliente);
  }
  /*Delete: Eliminar un cliente */
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server_url}/cliente/${id}`);
  }
  /*Get by ID: Obtener un cliente por su ID */
  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.server_url}/cliente/${id}`);
  }
  /*Get by pagination: Obtener clientes con paginación */
  obtenerClientesPaginados(pagina: number, tamanoPagina: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.server_url}/cliente?page=${pagina}&size=${tamanoPagina}`);
  }
  /*Get by search: Buscar clientes por nombre */
  /*buscarClientesPorNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.server_url}/cliente/search?nombre=${nombre}`);
  }*/
}