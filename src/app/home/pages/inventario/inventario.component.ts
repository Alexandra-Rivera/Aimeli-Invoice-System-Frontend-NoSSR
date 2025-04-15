import { Component } from '@angular/core';
import { NavComponentComponent } from "../../../components/nav-component/nav-component.component";
import { ProductoComponentComponent } from "./components/producto-component/producto-component.component";

@Component({
  selector: 'app-inventario',
  imports: [NavComponentComponent, ProductoComponentComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

}
