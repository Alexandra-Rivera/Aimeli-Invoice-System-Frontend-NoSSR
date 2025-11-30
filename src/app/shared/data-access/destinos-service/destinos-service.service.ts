import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Departamento } from '../../interfaces/departamento/departamento';
import { MunicipiosPorDepartamento } from '../../interfaces/MunicipiosPorDepartamento/municipios-por-departamento';
import { Destino } from '../../interfaces/destino/destino';
import { RespuestaServidor } from '../../interfaces/respuesta-servidor/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class DestinosServiceService {

  constructor() { }
  protected http = inject(HttpClient);
  private server_url = environment.API_URL;
  

  /*GET ALL: Obtener todos los departamentos de El Salvador */
  obtenerDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.server_url}/departamento`);
  }

  /*GET ALL: Obtener todos los municipios por departamento */
  obtenerMunicipiosPorDepartamento(id: number): Observable<MunicipiosPorDepartamento[]> {
    return this.http.get<MunicipiosPorDepartamento[]>(`${this.server_url}/departamento/${id}/municipio/`);  
  }
  /*POST: Crear un nuevo destino */
  crearDestino(destino: Destino): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.server_url}/destino`, destino);
  }
  /*GET ALL: Obtener todos los destinos */
  obtenerDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(`${this.server_url}/destino`);
  }
  /*PUT: Actualizar un destino */
  actualizarDestino(destino: Destino): Observable<RespuestaServidor> {
    return this.http.put<RespuestaServidor>(`${this.server_url}/destino`, destino);
  }
  /*DELETE: Eliminar un destino */
  eliminarDestino(id: number): Observable<RespuestaServidor> {  
    return this.http.delete<RespuestaServidor>(`${this.server_url}/destino/${id}`);
  }
  /*GET BY: Buscar destinos por nombre */
  buscarDestinosPorNombre(nombre: string): Observable<Destino[]> {
    return this.http.get<Destino[]>(`${this.server_url}/destino/filter/${nombre}`);
  }
}
