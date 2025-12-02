import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RespuestaServidor } from '../../interfaces/respuesta-servidor/respuesta-servidor';
import { RegistroCompras } from '../../interfaces/compras/registro-compras';
import { RegistroCompraproducto } from '../../interfaces/compraproducto/registro-compraproducto';
import { CompraInformacion } from '../../interfaces/compras/compra-informacion';

@Injectable({
  providedIn: 'root',
})
export class ComprasServiceService {

  constructor() { }

  private server_Url = environment.API_URL;

  private http = inject(HttpClient);

  /*Obtener Proveedores */
  // obtenerProveedores(): Observable<Proveedor[]> {
  //   return this.http.get<Proveedor[]>(`${this.server_Url}/proveedor`);
  // }

  /*GET productos segun categoria */
  // obtenerProductosSegunCategoria() {
  //
  // }

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
  obtenerRegistrosCompraSegunFecha(fecha_desde: string, fecha_hasta: string): Observable<RegistroCompraproducto> {
    const requestParams = new HttpParams()
    .set('desde', fecha_desde)
    .set('hasta', fecha_hasta)

    return this.http.get<RegistroCompraproducto>(`${this.server_Url}/compraproductos/paginacion`, { params: requestParams });

  }
  /*GET BY ID Solicitar item por id */
  solicitarItemPorID(compra_id: number): Observable<CompraInformacion> {
    return this.http.get<CompraInformacion>(`${this.server_Url}/compraproductos/${compra_id}`);
  }
}
