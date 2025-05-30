import { Component, inject, OnInit } from '@angular/core';
import { NavComponentComponent } from "../../../components/nav-component/nav-component.component";
import { ProductoComponentComponent } from "./components/producto-component/producto-component.component";
import { initFlowbite } from 'flowbite';
import { ProductosServiceService } from '../../../shared/data-access/productos-service/productos-service.service';
import { tap } from 'rxjs';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { CommonModule } from '@angular/common';
import { ProductoCompleto } from '../../../shared/interfaces/producto/producto-completo';
import { RespuestaInventarioPaginacion } from '../../../shared/interfaces/respuesta-servidor/respuesta-inventario-paginacion';
import { Categoria } from '../../../shared/interfaces/categoria/categoria';
import { CategoriasServiceService } from '../../../shared/data-access/categorias-service/categorias-service.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-inventario',
  imports: [NavComponentComponent, ProductoComponentComponent, CommonModule, NgxPaginationModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  protected productos: ProductoCompleto[] = []
  protected categorias: Categoria[] = []

  /*Pagination Variables */
  page: number = 1; 
  totalPages!: number;
  totalItems!: number;

  constructor(
    private toast: HotToastService,
    private productosService: ProductosServiceService,
    private categoriasService: CategoriasServiceService
  ) { }
  
  ngOnInit() {
    initFlowbite(); // Uncomment if you need to initialize Flowbite here

    this.obtenerProductosPorPaginacion();
  }

  obtenerProductosPorPaginacion() {
    console.log("Page: ", this.page);
    const backendPageIndex = this.page - 1;
      this.productosService.obtenerProductos(backendPageIndex).pipe(
        tap((data: RespuestaInventarioPaginacion) => {
          if (data.empty) {
            this.toast.info("¡Ya no hay más productos!");           
          } else {
            this.totalItems = data.totalElements;
            this.productos = data.content;
          }
        }) 
      ).subscribe({
        next: (m) => {
          console.log(m)
        },
        error: (e) => {
          console.log(e);
          this.toast.error("Algo falló.");
        }
      })
  }
  
  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().pipe(
      tap((data: Categoria[]) => {
          this.categorias = data;
      })
    );
  }
}
