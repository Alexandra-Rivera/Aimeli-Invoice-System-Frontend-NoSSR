import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-component-ventas',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-component-ventas.component.html',
  styleUrl: './nav-component-ventas.component.css'
})
export class NavComponentVentasComponent {
  @Input() titulo: string = 'titulo por defecto';
}
