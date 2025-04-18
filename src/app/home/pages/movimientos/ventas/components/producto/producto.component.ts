import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() codigo_SKU: string = "XUJKLMNPT001";
  @Input() nombre:string = "Nombre por defecto";
  @Input() descripcion: string = "Descripcion del producto por defecto";
  @Input() cantidad_existencias: number = 5;
  @Input() costo_unitario: number = 5.3;
  @Input() precio_venta: number = 10.50;
}
