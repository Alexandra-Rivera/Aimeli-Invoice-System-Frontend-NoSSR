import { Component, inject, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";
import { RegistroDeComprasTablaComponent } from "../components/registro-de-compras-tabla/registro-de-compras-tabla.component";
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComprasServiceService } from '../../../../../shared/data-access/compras-service/compras-service.service';

@Component({
  selector: 'app-registro-compras',
  imports: [NavComponentComponent, RegistroDeComprasTablaComponent, RouterLink, RouterLinkActive],
  templateUrl: './registro-compras.component.html',
  styleUrl: './registro-compras.component.css',
  providers: [ComprasServiceService],
})
export class RegistroComprasComponent implements OnInit {
  constructor() { }

  registros!: any[];

  comprasService = inject(ComprasServiceService);
  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }

  handleClick() {
    // this.comprasService.obtenerRegistroCompras();
  }
}
