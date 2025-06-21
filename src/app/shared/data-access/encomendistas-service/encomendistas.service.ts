import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Encomendista } from '../../interfaces/encomendista/encomendista';
import { Observable } from 'rxjs';
import { EncomendistaDestino } from '../../interfaces/encomendista/encomendista-destino';

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
}
