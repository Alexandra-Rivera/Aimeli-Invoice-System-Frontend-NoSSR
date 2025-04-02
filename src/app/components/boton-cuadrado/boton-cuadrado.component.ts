import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-cuadrado',
  imports: [],
  templateUrl: './boton-cuadrado.component.html',
  styleUrl: './boton-cuadrado.component.css'
})
export class BotonCuadradoComponent {
  @Input() title: string = "Texto por defecto";
}
