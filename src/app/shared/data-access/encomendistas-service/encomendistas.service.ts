import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Encomendista } from '../../interfaces/encomendista/encomendista';
import { Observable } from 'rxjs';
import { EncomendistaDestino } from '../../interfaces/encomendista/encomendista-destino';
import { RespuestaServidor } from '../../interfaces/respuesta-servidor/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class EncomendistasService {
  constructor() { }
  protected http = inject(HttpClient);
  private server_url = environment.API_URL;

  /*GET ALL: Obtener todos los encomendistas */
  obtenerEncomendistas(): Observable<EncomendistaDestino[]> {
    return this.http.get <EncomendistaDestino[]> (`${this.server_url}/encomendista`);
  }

  /*Get by nombre: Buscar encomendistas por nombre */
  buscarEncomendistasPorNombre(nombre: string): Observable<EncomendistaDestino[]> {
    return this.http.get<EncomendistaDestino[]>(`${this.server_url}/encomendista/filter/${nombre}`);
  }

  /*Post: Crear un nuevo encomendista */
  crearEncomendista(encomendista: EncomendistaDestino): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.server_url}/encomendista`, encomendista);
  }
  /*Eliminar encomendista */
  eliminarEncomendista(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.server_url}/encomendista`, { params: { id: id } });
  }
  /*Actualizar encomendista */
  actualizarEncomendista(encomendista: EncomendistaDestino): Observable<RespuestaServidor> {
    return this.http.put<RespuestaServidor>(`${this.server_url}/encomendista`, encomendista);
  }
}
