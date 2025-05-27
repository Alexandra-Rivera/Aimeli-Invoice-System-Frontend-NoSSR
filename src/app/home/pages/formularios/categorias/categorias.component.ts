
import { Component, inject, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../../shared/interfaces/categoria/categoria';
import { CategoriasServiceService } from '../../../../shared/data-access/categorias-service/categorias-service.service';
import { catchError, of, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  imports: [NavComponentComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  /*Inyeccion de dependencias */
  categoriasService = inject(CategoriasServiceService);

  /*Variables */
  fechaActual: Date = new Date();
  fechaModificacion: Date = new Date();

  protected categorias: Categoria[] = [];
  protected categorias_filtradas: any[] = [];
  mostrarBoton = false;

  protected formularioCategoria: FormGroup;
  protected formularioBusqueda: FormGroup;
  private categoria!: Categoria;
  categoriaSeleccionadaIndex: number | null = null;
  estaEditando = false;

  constructor(private fb: FormBuilder) {
    this.formularioCategoria = fb.group({
      categoria: ['', Validators.required],
    });

    this.formularioBusqueda = fb.group({
      categoria: ['']
    })
  }


  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerFechas(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
 
    return `${anio}-${mes}-${dia}`
  }

  
  seleccionarCategoria(index: number) {
    console.log("id seleccionado:", index);
    this.mostrarBoton = true;
    this.estaEditando = true;
    const categoriaSeleccionada: Categoria = this.categorias[index];
    this.categoriaSeleccionadaIndex = categoriaSeleccionada.id;

    this.formularioCategoria.controls['categoria'].patchValue(categoriaSeleccionada.categoria);
  }

  agregarCategoria() {
    this.estaEditando = false;
    this.categoriaSeleccionadaIndex = null;
    this.mostrarBoton = false;
    this.formularioCategoria.reset();
  }

  guardarCambios() {
    if (this.estaEditando === true && this.categoriaSeleccionadaIndex !== null) {
      this.categoria = {
        id: this.categoriaSeleccionadaIndex,
        categoria: this.formularioCategoria.controls['categoria'].value ?? "",
        fechaActualizacion: this.obtenerFechas(this.fechaActual),
        fechaCreacion: this.obtenerFechas(this.fechaModificacion),
        estado: true,
      };
      this.categoriasService.actualizarCategoria(this.categoria).pipe().subscribe({
        next: (response) => console.log(response),
        error: (e) => console.log(e),
      });
    } else {
      const nueva_categoria = this.formularioCategoria.controls['categoria']?.value ?? "";
      if (nueva_categoria) {
      this.categoriasService.crearCategoria(nueva_categoria).pipe().subscribe({
        error: (e) => console.log(e)
      })
      }
    }
    window.location.reload();
  };

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().pipe(
      tap((data: Categoria[]) => {
        this.categorias = data;
      })
    ).subscribe({
      error: (e) => console.log(e),
      complete: () => console.log("Completado")
    })
  }

  eliminarCategoria() {
    if (this.categoriaSeleccionadaIndex) {
      console.log("Index a elimiar:", this.categoriaSeleccionadaIndex);
      this.categoriasService.eliminarCategoriaPorId(this.categoriaSeleccionadaIndex).pipe().subscribe({
        next: (message) => console.log(message),
        error: (e) => console.log(e),
        complete: () => console.log("Operacion completada con exito"),
      }); 
    };
    window.location.reload();
  }

  buscarCategoria() {
    let texto_ingresado = this.formularioBusqueda.controls['categoria']?.value;

    if (texto_ingresado) {
      this.categoriasService.filtrarCategoria(texto_ingresado).pipe(
        tap((data: any[]) => {
         this.categorias = data;
        })
      ).subscribe({
        next: (message) => console.log(message),
        error: (error) => console.log(error),
        complete: () => console.log("Completado")
      });
    } else {
      this.obtenerCategorias()
    }
  }
}
