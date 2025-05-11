import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Departamento } from '../../interfaces/departamento/departamento';

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

  /*GET ALL: Obtener todos los municipios de El Salvador */
  obtenerMunicipios() {

  }
}
