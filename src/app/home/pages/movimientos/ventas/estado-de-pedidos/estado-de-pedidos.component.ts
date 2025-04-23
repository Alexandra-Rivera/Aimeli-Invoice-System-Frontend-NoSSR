import { Component, Input } from '@angular/core';
import { NavComponentVentasComponent } from "../components/nav-component-ventas/nav-component-ventas.component";

@Component({
  selector: 'app-estado-de-pedidos',
  imports: [NavComponentVentasComponent],
  templateUrl: './estado-de-pedidos.component.html',
  styleUrl: './estado-de-pedidos.component.css'
})
export class EstadoDePedidosComponent {
  @Input() fecha_venta: string = "05 / 03 / 2025";
  @Input() n_factura: string = "FAC0001";
  @Input() cliente: string = "SARA VILMA PENA DE RODRIGUEZ";
  @Input() destino: string = "Tepecoyo";
  @Input() total: number = 22.50;
  @Input() estado: string = "Entregado";
}
