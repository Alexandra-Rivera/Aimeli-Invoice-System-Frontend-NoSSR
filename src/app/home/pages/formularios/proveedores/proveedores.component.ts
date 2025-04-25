import { Component, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';

@Component({
  selector: 'app-proveedores',
  imports: [NavComponentComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  @Input() proveedores: any[] = [];

}
