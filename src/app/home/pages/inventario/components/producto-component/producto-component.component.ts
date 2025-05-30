import { Component, Input } from '@angular/core';
import { ProductoCompleto } from '../../../../../shared/interfaces/producto/producto-completo';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-component',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './producto-component.component.html',
  styleUrl: './producto-component.component.css'
})
export class ProductoComponentComponent {


  /*Pagination Variables & directivas*/
  @Input() p: number = 0;
  @Input() productos: ProductoCompleto[] = [];
  @Input() totalItems!: number;
  

  constructor(
    private router: Router 
  ) {
  }

  
  editarProducto(index: number) {
    const producto = this.productos[index];
    this.router.navigate(['inventario/editar-producto', producto.id]);
  }
}
