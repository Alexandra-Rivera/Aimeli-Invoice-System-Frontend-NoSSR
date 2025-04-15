import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-producto-component',
  imports: [],
  templateUrl: './producto-component.component.html',
  styleUrl: './producto-component.component.css'
})
export class ProductoComponentComponent {
  @Input() codigo_SKU: string = "XUJKLMNPT001";
  @Input() nombre:string = "Nombre por defecto";
  @Input() descripcion: string = "Descripcion del producto por defecto";
  @Input() cantidad_existencias: number = 5;
  @Input() costo_unitario: number = 5.3;
  @Input() precio_venta: number = 10.50;
}
