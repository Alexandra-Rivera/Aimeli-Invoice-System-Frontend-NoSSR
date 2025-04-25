import { Component } from '@angular/core';
import { NavComponentVentasComponent } from "../components/nav-component-ventas/nav-component-ventas.component";
import { ProductoComponent } from "./producto/producto.component";

@Component({
  selector: 'app-listado-productos',
  imports: [NavComponentVentasComponent, ProductoComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {

}
