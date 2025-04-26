import { Component, Input, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-estado-de-pedidos',
  imports: [NavComponentComponent],
  templateUrl: './estado-de-pedidos.component.html',
  styleUrl: './estado-de-pedidos.component.css'
})
export class EstadoDePedidosComponent implements OnInit {
  constructor() { }
  @Input() fecha_venta: string = "05 / 03 / 2025";
  @Input() n_factura: string = "FAC0001";
  @Input() cliente: string = "SARA VILMA PENA DE RODRIGUEZ";
  @Input() destino: string = "Tepecoyo";
  @Input() total: number = 22.50;
  @Input() estado: string = "Entregado";

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }
}
