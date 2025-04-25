import { Component } from '@angular/core';
import { RegistroVentasTablaComponent } from "./registro-ventas-tabla/registro-ventas-tabla.component";
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";

@Component({
  selector: 'app-historial-ventas',
  imports: [RegistroVentasTablaComponent, NavComponentComponent],
  templateUrl: './historial-ventas.component.html',
  styleUrl: './historial-ventas.component.css'
})
export class HistorialVentasComponent {

}
