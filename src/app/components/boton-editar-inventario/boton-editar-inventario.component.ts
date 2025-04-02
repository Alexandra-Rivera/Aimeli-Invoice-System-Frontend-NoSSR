import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-editar-inventario',
  imports: [],
  templateUrl: './boton-editar-inventario.component.html',
  styleUrl: './boton-editar-inventario.component.css'
})
export class BotonEditarInventarioComponent {
  @Input() estilos: string = "boton-icono-editar w-15 h-15 centrar-contenido";
  @Input() icon_styles: string = "w-[100%] h-[100%]";
}
