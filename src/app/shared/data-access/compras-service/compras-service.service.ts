import { Injectable } from '@angular/core';
import { RegistroComprasComponent } from '../../../home/pages/movimientos/compras/registro-compras/registro-compras.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ComprasServiceService {

  constructor() { }

  crearRegistroCompra(registroFactura: FormGroup) {

  }

  url = "http://localhost:3000/Registros"

  async obtenerRegistrosCompras(): Promise<RegistroComprasComponent[]> {
    const registros = await fetch(this.url);
    return (await registros.json()); 
  }
}
