import { Component } from '@angular/core';
import { NavComponentVentasComponent } from "../components/nav-component-ventas/nav-component-ventas.component";
import { RegistroVentasTablaComponent } from "./registro-ventas-tabla/registro-ventas-tabla.component";

@Component({
  selector: 'app-historial-ventas',
  imports: [NavComponentVentasComponent, RegistroVentasTablaComponent],
  templateUrl: './historial-ventas.component.html',
  styleUrl: './historial-ventas.component.css'
})
export class HistorialVentasComponent {

}
