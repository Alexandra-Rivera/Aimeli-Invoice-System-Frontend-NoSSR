import { Component, inject, Input } from '@angular/core';
import { ProductoCompleto } from '../../../../../shared/interfaces/producto/producto-completo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../../../shared/interfaces/producto/producto';
import { Categoria } from '../../../../../shared/interfaces/categoria/categoria';
import { CategoriasServiceService } from '../../../../../shared/data-access/categorias-service/categorias-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-producto-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-component.component.html',
  styleUrl: './producto-component.component.css'
})
export class ProductoComponentComponent {

  protected formularioProducto!: FormGroup;
  protected fb = inject(FormBuilder);
  protected categoriasService = inject(CategoriasServiceService);

  estaEditando: boolean = false;
  editandoProductos: {[key:number]: boolean} = {};
  productoSeleccionadoId: number | null = null;
  imagenesString: { [key: number]: string } = {};
  categorias: Categoria[] = [];


  @Input() productos: ProductoCompleto[] = [];

  constructor() {
    this.formularioProducto = this.fb.group({
          id: [''],
          imagen: [''],
          nombre: [''],
          descripcion: [''],
          categoriaDTO: [''],
          costoUnitario: [''],
          precioVenta: [''],
    })
  }

  editarProducto(index: number) {
    console.log("Posicion de producto: ", index);
    this.editandoProductos[index] = true;
    this.productoSeleccionadoId = this.productos[index].id;
    this.obtenerCategorias();
      
    const producto: ProductoCompleto = this.productos[index];
 
    this.formularioProducto.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      costoUnitario: producto.costoUnitario,
      precioVenta: producto.precioVenta
    })
  }

  actualizarProducto() {

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
}
