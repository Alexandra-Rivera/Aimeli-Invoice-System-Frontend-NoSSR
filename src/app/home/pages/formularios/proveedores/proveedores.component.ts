import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  imports: [],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  @Input() proveedores: any[] = [];

}
