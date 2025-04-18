import { Component } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";
import { RegistroDeComprasTablaComponent } from "./components/registro-de-compras-tabla/registro-de-compras-tabla.component";

@Component({
  selector: 'app-registro-compras',
  imports: [NavComponentComponent, RegistroDeComprasTablaComponent],
  templateUrl: './registro-compras.component.html',
  styleUrl: './registro-compras.component.css'
})
export class RegistroComprasComponent {

}
