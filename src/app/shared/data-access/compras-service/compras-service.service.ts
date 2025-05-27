import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { empty, Observable, shareReplay } from 'rxjs';
import { MetodoPago } from '../../interfaces/metodopago/metodo-pago';
import { Proveedor } from '../../interfaces/proveedor/proveedor';
import { RespuestaServidor } from '../../interfaces/respuesta-servidor/respuesta-servidor';
import { RegistroCompras } from '../../interfaces/compras/registro-compras';

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
  crearRegistroCompra(registroFactura: RegistroCompras, imagenes: File[]): Observable<RespuestaServidor> {
    const formData = new FormData();
    formData.append("compraProductoJson", JSON.stringify(registroFactura));

    for (let i = 0; i < imagenes.length; i++) {
      formData.append('imagenes', imagenes[i], imagenes[i].name);
    }

    return this.http.post<RespuestaServidor>(`${this.server_Url}/compraproductos`, formData);
  }

  /*GET Solicitar Registros de Compra */
  obtenerRegistrosCompraSegunFecha() {

  }
  /*GET BY ID Solicitar item por id */
  solicitarItemPorID() {

  }
}
