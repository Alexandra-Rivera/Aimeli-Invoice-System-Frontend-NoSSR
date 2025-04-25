import { Component } from '@angular/core';
import { NavComponentVentasComponent } from "../components/nav-component-ventas/nav-component-ventas.component";
import { ProductoComponent } from "./producto/producto.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  imports: [RouterOutlet,NavComponentVentasComponent, ProductoComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {

}
