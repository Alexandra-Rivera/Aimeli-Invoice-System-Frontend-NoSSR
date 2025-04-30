import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productos-tabla-component',
  imports: [],
  templateUrl: './productos-tabla-component.component.html',
  styleUrl: './productos-tabla-component.component.css'
})
export class ProductosTablaComponentComponent {
  @Input("") id: number = 0;
  @Input("") nombreProducto:string = "";
  @Input("") descripcionProducto: string = "";
  @Input("") categoria: string = "";
  @Input("") cantidadProducto: number = 1;
  @Input("") costoUnitario: number = 2.25;
  @Input("") precioVenta: number = 3.50;
}
