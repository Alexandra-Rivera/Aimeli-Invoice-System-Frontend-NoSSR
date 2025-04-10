import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-component',
  imports: [],
  templateUrl: './nav-component.component.html',
  styleUrl: './nav-component.component.css'
})
export class NavComponentComponent {
  @Input() titulo: string = 'titulo por defecto';
}
