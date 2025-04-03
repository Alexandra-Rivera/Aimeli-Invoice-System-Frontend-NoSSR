import { Component } from '@angular/core';
import { BotonIconoEliminarComponent } from "../../../../components/boton-icono-eliminar/boton-icono-eliminar.component";
import { BotonRedondeadoComponent } from "../../../../components/boton-redondeado/boton-redondeado.component";

@Component({
  selector: 'app-clientes',
  imports: [BotonIconoEliminarComponent, BotonRedondeadoComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

}
