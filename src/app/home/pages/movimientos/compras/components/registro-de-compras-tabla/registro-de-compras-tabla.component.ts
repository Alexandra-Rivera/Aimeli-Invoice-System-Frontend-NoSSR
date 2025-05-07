import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registro-de-compras-tabla',
  imports: [],
  templateUrl: './registro-de-compras-tabla.component.html',
  styleUrl: './registro-de-compras-tabla.component.css'
})
export class RegistroDeComprasTablaComponent {
  @Input() fecha_compra: string = "05 / 03 / 2025";
  @Input() n_factura: string = "FAC0001";
  @Input() proveedor: string = "SHEIN";
  @Input() productos: string = "CAMISOLA BLANCA TIPO CROPTOP, ARITOS...";
  @Input() metodo_pago : string = "Efectivo";
  @Input() total: number = 22.50;
}
