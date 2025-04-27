import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function

@Component({
  selector: 'app-formulario-registro',
  imports: [],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
      initFlowbite();
    }
}

