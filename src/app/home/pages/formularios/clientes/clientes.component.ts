import { Component, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-clientes',
  imports: [NavComponentComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  @Input() clientes: any[] = [];

  formularioClientes = new FormGroup({
    nombre: new FormControl(''),
    telefono: new FormControl(''),
  
  })

  handleSubmit() {
    console.log(this.formularioClientes.value);
  }
  
}
