import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-component-ventas',
  imports: [],
  templateUrl: './nav-component-ventas.component.html',
  styleUrl: './nav-component-ventas.component.css'
})
export class NavComponentVentasComponent {
  @Input() titulo: string = 'titulo por defecto';
}
