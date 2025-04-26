import { Component, OnInit } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-formulario-compras',
  imports: [NavComponentComponent],
  templateUrl: './formulario-compras.component.html',
  styleUrl: './formulario-compras.component.css'
})
export class FormularioComprasComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }

}
