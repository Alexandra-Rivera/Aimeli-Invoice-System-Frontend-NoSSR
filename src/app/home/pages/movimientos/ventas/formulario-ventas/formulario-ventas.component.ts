import { Component, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";

@Component({
  selector: 'app-formulario-ventas',
  imports: [NavComponentComponent],
  templateUrl: './formulario-ventas.component.html',
  styleUrl: './formulario-ventas.component.css'
})
export class FormularioVentasComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
    // initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }

}
