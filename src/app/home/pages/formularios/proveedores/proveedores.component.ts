import { Component, Directive, inject } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { FormBuilder, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Proveedor } from '../../../../shared/interfaces/proveedor/proveedor';
import { ProveedoresServiceService } from '../../../../shared/data-access/proveedores-service/proveedores-service.service';
import { tap } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

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

  constructor(private toast: HotToastService) {
    this.formularioProveedores = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      numeroNit: ['', Validators.required],
      numeroNrc: ['', Validators.required]
    })

    this.formularioBusqueda = this.fb.group({
      proveedor: ['']
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
        next: () => {this.toast.success('Proveedor actualizado con éxito');},
        error: (error) => {
          this.toast.error('Error al actualizar proveedor');
        }
        
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
          next: () => {this.toast.success('Proveedor creado con éxito');},
          error: (error) => {
            this.toast.error('Error al crear proveedor');
          }
        })
      }
    }
setTimeout(() => {
    window.location.reload();}, 2000);
  }

  eliminarProveedor() {
    if (this.estaEditando === true && this.proveedorSeleccionadoId !== null) {
      this.proveedoresService.eliminarProveedor(this.proveedorSeleccionadoId).pipe().subscribe(
        {
         next: () => {this.toast.success('Proveedor eliminado con éxito');},
         error: (error) => {
           this.toast.error('Error al eliminar proveedor');
        }
      }
      );
    }
setTimeout(() => {
    window.location.reload();}, 2000);
  
  }

   buscarProveedorPorNombre() {
    let texto_ingresado = this.formularioBusqueda.controls['proveedor']?.value;

    if (texto_ingresado) {
      this.proveedoresService.buscarProveedoresPorNombre(texto_ingresado).pipe(
        tap((data: Proveedor[]) => {
          this.proveedores = data;
        })
      ).subscribe({
      });
    }
}
}