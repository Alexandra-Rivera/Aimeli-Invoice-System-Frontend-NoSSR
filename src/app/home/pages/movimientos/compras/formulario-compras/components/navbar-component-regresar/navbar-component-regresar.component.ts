import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-component-regresar',
  imports: [],
  templateUrl: './navbar-component-regresar.component.html',
  styleUrl: './navbar-component-regresar.component.css'
})
export class NavbarComponentRegresarComponent {
  @Input() titulo: string = 'titulo por defecto';
}
