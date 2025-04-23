
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categorias',
  imports: [],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

  @Input() categorias: any[] = [];

}
