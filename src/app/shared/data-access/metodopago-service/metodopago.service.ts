import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MetodoPago } from '../../interfaces/metodopago/metodo-pago';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {
  private server_Url = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

    /*Obtener Metodo de pago */
  obtenerMetodoDePago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(`${this.server_Url}/metodopago`);
  }
}
