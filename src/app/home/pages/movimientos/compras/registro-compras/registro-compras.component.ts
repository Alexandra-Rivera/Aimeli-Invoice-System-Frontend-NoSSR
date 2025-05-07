import { Component, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";
import { RegistroDeComprasTablaComponent } from "../components/registro-de-compras-tabla/registro-de-compras-tabla.component";
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registro-compras',
  imports: [NavComponentComponent, RegistroDeComprasTablaComponent, RouterLink, RouterLinkActive],
  templateUrl: './registro-compras.component.html',
  styleUrl: './registro-compras.component.css'
})
export class RegistroComprasComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }

}
