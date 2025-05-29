import { Component, inject, Input } from '@angular/core';
import { ProductoCompleto } from '../../../../../shared/interfaces/producto/producto-completo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../../../../shared/interfaces/categoria/categoria';
import { CategoriasServiceService } from '../../../../../shared/data-access/categorias-service/categorias-service.service';
import { tap } from 'rxjs';
import { ProductosServiceService } from '../../../../../shared/data-access/productos-service/productos-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-component.component.html',
  styleUrl: './producto-component.component.css'
})
export class ProductoComponentComponent {

  /*Definicion de variables */
  protected formularioProducto!: FormGroup;

  /*Inyecciones */
  protected fb = inject(FormBuilder);
  protected categoriasService = inject(CategoriasServiceService);
  protected productosService = inject(ProductosServiceService);

  estaEditando: boolean = false;
  editandoProductos: {[key:number]: boolean} = {};
  productoSeleccionadoId: number | null = null;
  imagenesString: { [key: number]: string } = {};
  categorias: Categoria[] = [];


  @Input() productos: ProductoCompleto[] = [];

  constructor(private router: Router) {
  }



  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().pipe(
      tap((data: Categoria[]) => {
        this.categorias = data;
      })
    ).subscribe({
      next: (m) => console.log(m),
      error: (e) => console.error(e),
      complete: () => console.log("Completado")
    })
  }

  editarProducto(index: number) {
    const producto = this.productos[index];
    this.router.navigate(['inventario/editar-producto', producto.id]);
  }
}
