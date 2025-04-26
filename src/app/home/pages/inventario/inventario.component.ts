import { Component, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../components/nav-component/nav-component.component";
import { ProductoComponentComponent } from "./components/producto-component/producto-component.component";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-inventario',
  imports: [NavComponentComponent, ProductoComponentComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }

}
