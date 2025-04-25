import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registro-ventas-tabla',
  imports: [],
  templateUrl: './registro-ventas-tabla.component.html',
  styleUrl: './registro-ventas-tabla.component.css'
})
export class RegistroVentasTablaComponent {
  @Input() fecha_compra: string = "05 / 03 / 2025";
  @Input() n_factura: string = "FAC0001";
  @Input() cliente: string = "SHEIN";
  @Input() productos: string = "CAMISOLA BLANCA TIPO CROPTOP, ARITOS...";
  @Input() metodo_pago : string = "Efectivo";
  @Input() total: number = 22.50;
  @Input() estado: string = "Entregado";
}
