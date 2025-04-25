import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-encomendistas',
  imports: [],
  templateUrl: './encomendistas.component.html',
  styleUrl: './encomendistas.component.css'
})
export class EncomendistasComponent {

  @Input() encomendistas: any[] = [];

}
