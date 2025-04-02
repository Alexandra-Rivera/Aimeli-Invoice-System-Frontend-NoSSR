import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-agregar-al-carrito',
  imports: [],
  templateUrl: './boton-agregar-al-carrito.component.html',
  styleUrl: './boton-agregar-al-carrito.component.css'
})
export class BotonAgregarAlCarritoComponent {
  @Input() estilos: string = "boton-icono-agregar-carrito w-15 h-15 centrar-contenido";
  @Input() icon_styles: string = "ocupar-espacio-del-contenedor text-white-font-color"
}
