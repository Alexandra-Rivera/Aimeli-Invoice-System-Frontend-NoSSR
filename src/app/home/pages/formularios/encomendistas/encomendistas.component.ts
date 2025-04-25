import { Component, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';

@Component({
  selector: 'app-encomendistas',
  imports: [NavComponentComponent],
  templateUrl: './encomendistas.component.html',
  styleUrl: './encomendistas.component.css'
})
export class EncomendistasComponent {

  @Input() encomendistas: any[] = [];

}
