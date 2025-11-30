import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from '../../interfaces/proveedor/proveedor';
import { RespuestaServidor } from '../../interfaces/respuesta-servidor/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {
  protected http = inject(HttpClient);
  protected server_url = environment.API_URL;

  constructor() { }

  /*GET: Obtener proveedores */
  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.server_url}/proveedor`);
  }

  /*POST: Crear proveedor */
  crearProveedor(proveedor: Proveedor): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.server_url}/proveedor`, proveedor);
  }

  /*DELETE: Eliminar Proveedor */
  eliminarProveedor(proveedor_id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.server_url}/proveedor/${proveedor_id}`);
  }

  /*PUT: Actualizar proveedor */
  actualizarProveedor(proveedor: Proveedor): Observable<RespuestaServidor> {
    return this.http.put<RespuestaServidor>(`${this.server_url}/proveedor`, proveedor);
  }

  /*GET BY ID: Obtener proveedor por id */
  obtenerProveedorPorId(id_proveedor: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.server_url}/proveedor/${id_proveedor}`);
  }

  /*Get by search: Buscar proveedor por nombre */
    buscarProveedoresPorNombre(nombre: string): Observable<Proveedor[]> {
      return this.http.get<Proveedor[]>(`${this.server_url}/proveedor/filter/${nombre}`);
    }
  }
