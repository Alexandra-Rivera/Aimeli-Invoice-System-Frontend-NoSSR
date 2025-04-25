import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-component.component.html',
  styleUrl: './nav-component.component.css'
})
export class NavComponentComponent {
  @Input() titulo: string = 'titulo por defecto';
  @Input() titulo_enlace: string = "Menú Principal"; 
  @Input() enlace_Href: string = "/";
}
