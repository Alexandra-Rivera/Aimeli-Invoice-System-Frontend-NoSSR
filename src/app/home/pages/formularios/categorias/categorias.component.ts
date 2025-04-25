
import { Component, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';

@Component({
  selector: 'app-categorias',
  imports: [NavComponentComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

  @Input() categorias: any[] = [];

}
