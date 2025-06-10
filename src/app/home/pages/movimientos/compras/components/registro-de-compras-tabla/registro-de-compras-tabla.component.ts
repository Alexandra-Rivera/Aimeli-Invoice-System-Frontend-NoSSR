import { Component, Input } from '@angular/core';
import { ProductoInfoCompraproducto } from '../../../../../../shared/interfaces/compraproducto/producto-info-compraproducto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-de-compras-tabla',
  imports: [CommonModule],
  templateUrl: './registro-de-compras-tabla.component.html',
  styleUrl: './registro-de-compras-tabla.component.css'
})
export class RegistroDeComprasTablaComponent {
  // @Input() fecha_compra: string = "05 / 03 / 2025";
  // @Input() n_factura: string = "FAC0001";
  // @Input() proveedor: string = "SHEIN";
  // @Input() productos: string = "CAMISOLA BLANCA TIPO CROPTOP, ARITOS...";
  // @Input() metodo_pago : string = "Efectivo";
  // @Input() total: number = 22.50;

  @Input() registros!: ProductoInfoCompraproducto[];
}
