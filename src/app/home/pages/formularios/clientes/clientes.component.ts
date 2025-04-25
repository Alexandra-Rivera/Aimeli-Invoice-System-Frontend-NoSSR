import { Component, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';

@Component({
  selector: 'app-clientes',
  imports: [NavComponentComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  @Input() clientes: any[] = [];

  
}
