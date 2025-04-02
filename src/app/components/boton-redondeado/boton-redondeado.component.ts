import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-redondeado',
  imports: [],
  templateUrl: './boton-redondeado.component.html',
  styleUrl: './boton-redondeado.component.css'
})
export class BotonRedondeadoComponent {
  @Input() title: string = "Texto por defecto";
  @Input() estilos: string = "";
}
