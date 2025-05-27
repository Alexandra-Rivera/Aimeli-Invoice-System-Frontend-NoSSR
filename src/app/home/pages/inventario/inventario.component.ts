import { Component, inject, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../components/nav-component/nav-component.component";
import { ProductoComponentComponent } from "./components/producto-component/producto-component.component";
import { initFlowbite } from 'flowbite';
import { ProductosServiceService } from '../../../shared/data-access/productos-service/productos-service.service';
import { Producto } from '../../../shared/interfaces/producto/producto';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductoCompleto } from '../../../shared/interfaces/producto/producto-completo';

@Component({
  selector: 'app-inventario',
  imports: [NavComponentComponent, ProductoComponentComponent, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  constructor() { }

  private productosService = inject(ProductosServiceService);

  protected productos: ProductoCompleto[] = []

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here

    this.productosService.obtenerProductos().pipe(
      tap((data: ProductoCompleto[])=> {
        this.productos = data;
      }) 
    ).subscribe({
      next: (m) => console.log(m),
      error: (e) => console.error(e),
      complete: () => console.log("Completed.")
    });
  }
}
