import { Component, Directive, inject } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { FormBuilder, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Proveedor } from '../../../../shared/interfaces/proveedor/proveedor';
import { ProveedoresServiceService } from '../../../../shared/data-access/proveedores-service/proveedores-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-proveedores',
  imports: [NavComponentComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  /*Inyeccion de dependencias */
  fb = inject(FormBuilder);
  protected proveedoresService = inject(ProveedoresServiceService);


  /*Variables globales */
  protected mostrarBoton: boolean = false;
  protected proveedores: Proveedor[] = [];
  protected proveedorSeleccionadoId: number | null = null;
  protected estaEditando: boolean = false;
  protected formularioProveedores!: FormGroup;
  protected formularioBusqueda!: FormGroup;

  /*Variables de gestion de respuestas de la API */
  protected message: object = {};
  protected error: object = {};

  constructor() {
    this.formularioProveedores = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      numeroNit: ['', Validators.required],
      numeroNrc: ['', Validators.required]
    })

    this.formularioBusqueda = this.fb.group({
      palabra: ['']
    })
  }

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedoresService.obtenerProveedores().pipe(
      tap((data: any[]) => {
        this.proveedores = data;
      })
    ).subscribe({
      next: (m) => console.log(m),
      error: (e) => console.error(e),
      complete: () => console.log("Completado")
    });
  }


  seleccionarProveedor(index: number) {
    this.estaEditando = true;
    this.mostrarBoton = true;
    const proveedor: Proveedor = this.proveedores[index];
    this.proveedorSeleccionadoId = proveedor.id;

    this.formularioProveedores.patchValue({
      nombre: proveedor.nombre,
      direccion: proveedor.direccion,
      numeroNit: proveedor.numeroNit ?? "",
      numeroNrc: proveedor.numeroNRC ?? ""
    })
  }


  agregarProveedor() {
    this.estaEditando = false;
    this.proveedorSeleccionadoId = null;
    this.mostrarBoton = false;
    this.formularioProveedores.reset();
  }
  
  guardarProveedor() {
    if (this.estaEditando === true && this.proveedorSeleccionadoId !== null) {
      console.log("Estado:", this.estaEditando);
      console.log("Formulario: ", this.formularioProveedores.value);

      const proveedor: Proveedor = {
        id: this.proveedorSeleccionadoId,
        nombre: this.formularioProveedores.controls['nombre'].value ?? "",
        direccion: this.formularioProveedores.controls['direccion'].value ?? "",
        numeroNit: this.formularioProveedores.controls['numeroNit'].value ?? "",
        numeroNRC: this.formularioProveedores.controls['numeroNrc'].value ?? "",
        fechaActualizacion: "",
        fechaCreacion: "",
        estado: true
      } 
      this.proveedoresService.actualizarProveedor(proveedor).pipe().subscribe({
        next: (m) => {
          console.log(m);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => console.log("Completado")
      })
    } else {
      const proveedor: Proveedor = {
        id: 999999999,
        nombre: this.formularioProveedores.controls['nombre'].value,
        direccion: this.formularioProveedores.controls['direccion'].value,
        numeroNit: this.formularioProveedores.controls['numeroNit'].value,
        numeroNRC: this.formularioProveedores.controls['numeroNrc'].value,
        fechaActualizacion: "",
        fechaCreacion: "",
        estado: true
      }

      if (proveedor.nombre !== "" || proveedor.direccion !== "") {
        this.proveedoresService.crearProveedor(proveedor).pipe().subscribe({
          next: (m) => console.log(m),
          error: (e) => console.error(e),
          complete: () => console.log("Completado")
        })
      }
    }

    window.location.reload();
  }

  eliminarProveedor() {
    if (this.estaEditando === true && this.proveedorSeleccionadoId !== null) {
      this.proveedoresService.eliminarProveedor(this.proveedorSeleccionadoId).pipe().subscribe(
        {
          next: (m) => console.log(m),
          error: (e) => console.log(e),
          complete: () => console.log("completado")
        }
      );
    }

    window.location.reload();
  }

   buscarProveedorPorNombre() {
    let texto_ingresado = this.formularioBusqueda.controls['palabra']?.value;

    if (texto_ingresado) {
      this.proveedoresService.buscarProveedoresPorNombre(texto_ingresado).pipe(
        tap((data: Proveedor[]) => {
          this.proveedores = data;
        })
      ).subscribe({
        next: (message) => console.log(message),
        error: (error) => console.log(error),
        complete: () => console.log("Completado")
      });
    } else {
      this.obtenerProveedores()
    }
}
}