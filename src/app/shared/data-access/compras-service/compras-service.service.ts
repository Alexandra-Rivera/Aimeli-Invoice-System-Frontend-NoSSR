import { inject, Injectable } from '@angular/core';
import { RegistroComprasComponent } from '../../../home/pages/movimientos/compras/registro-compras/registro-compras.component';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../interfaces/categoria/categoria';
import { environment } from '../../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { FacturaCompras } from '../../interfaces/compras/factura-compras';
import { MetodoPago } from '../../interfaces/metodopago/metodo-pago';
import { Proveedor } from '../../interfaces/proveedor/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ComprasServiceService {

  constructor() { }

  private server_Url = environment.API_URL;

  private http = inject(HttpClient);

  /*Obtener Metodo de pago */
  obtenerMetodoDePago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(`${this.server_Url}/metodopago`);
  }

  /*Obtener Proveedores */
  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.server_Url}/proveedor`);
  }

  /*GET productos segun categoria */
  obtenerProductosSegunCategoria() {

  }

  /*POST Registro de Compra */
  // crearRegistroCompra(registroFactura: FacturaCompras): Observable<FacturaCompras> {
  //   return this.http.post(`${this.server_Url}/`)
  // }

  /*GET Solicitar Registros de Compra */
  obtenerRegistrosCompraSegunFecha() {

  }
  /*GET BY ID Solicitar item por id */
  solicitarItemPorID() {

  }
}
