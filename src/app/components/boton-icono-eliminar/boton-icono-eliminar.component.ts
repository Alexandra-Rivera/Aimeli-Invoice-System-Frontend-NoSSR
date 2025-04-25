import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-icono-eliminar',
  imports: [],
  templateUrl: './boton-icono-eliminar.component.html',
  styleUrl: './boton-icono-eliminar.component.css'
})
export class BotonIconoEliminarComponent {
 @Input() estilos: string = "boton-icono-eliminar-relleno w-10 h-10 centrar-contenido";
 @Input() icon_styles: string = "w-[100%] h-[100%] text-white-font-color";
}
