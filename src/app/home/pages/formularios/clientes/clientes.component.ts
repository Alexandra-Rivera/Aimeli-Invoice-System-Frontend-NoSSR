import { Component, inject, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ClienteServiceService } from '../../../../shared/data-access/cliente-service/cliente.service';
import { Cliente } from '../../../../shared/interfaces/cliente/cliente';
import { tap } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-clientes',
  imports: [NavComponentComponent, ReactiveFormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  formularioClientes: FormGroup;
  formularioBusqueda: FormGroup;

  protected clientesLista: Cliente[] = [];
  protected clienteSeleccionadoId: number | null = null;
  protected clienteSeleccionado: Cliente | null = null;
  protected estaEditando: boolean = false;



  protected mostrarBoton: boolean = false;
  constructor( private toast: HotToastService) {
    this.formularioClientes = this.fb.group({
      nombre: [''],
      telefono: [''],
    });
    this.formularioBusqueda = this.fb.group({
      nombre: [''],    
    });
  }
  clientesService = inject(ClienteServiceService);
  fb = inject(FormBuilder);

  @Input() clientes: any[] = [];


  handleSubmit() {
  }

  ngOnInit() {
    this.ObternerClientes();
  }
  ObternerClientes() {
        this.clientesService.obtenerClientes().pipe(
          tap((data: Cliente[]) => {
            this.clientesLista = data;
          })
        ).subscribe({
        });
  }
  crearCliente() {
    const cliente: Cliente = {
      id: 999999999,
      nombreCliente: this.formularioClientes.value.nombre,
      telefonoCliente: this.formularioClientes.value.telefono
      
    };
    this.clientesService.crearCliente(cliente).pipe(
      tap((data: Cliente) => {
        this.ObternerClientes();
        this.formularioClientes.reset();
      })
    ).subscribe({
      next: () => {this .toast.success('Cliente creado con exito');},
      error: () => {this.toast.error('Error al crear el cliente');},
        
    });
  }
  editarCliente(cliente: Cliente) {
    this.mostrarBoton = true;
    this.estaEditando = true;
    this.clienteSeleccionadoId = cliente.id;
    this.formularioClientes.patchValue({
      nombre: cliente.nombreCliente,
      telefono: cliente.telefonoCliente
    });
  }
  actualizarCliente() {
    if (this.clienteSeleccionadoId !== null) {
      const clienteActualizado: Cliente = {
        id: this.clienteSeleccionadoId,
        nombreCliente: this.formularioClientes.value.nombre,
        telefonoCliente: this.formularioClientes.value.telefono
      };
      this.clientesService.actualizarCliente(clienteActualizado).pipe(
        tap((data: Cliente) => {
          this.ObternerClientes();
          this.formularioClientes.reset();
          this.estaEditando = false;
          this.clienteSeleccionadoId = null;
        })
      ).subscribe({
        next: () => {this .toast.success('Cliente actualizado con exito');},
        error: () => {this.toast.error('Error al actualizar el cliente');},
      });
    }
  }
  eliminarCliente() {
    if (this.clienteSeleccionadoId !== null) {
      this.clientesService.eliminarCliente(this.clienteSeleccionadoId).pipe(
        tap(() => {
          this.ObternerClientes();
          this.formularioClientes.reset();
          this.estaEditando = false;
        })
      ).subscribe({
        next: () => {this .toast.success('Cliente eliminado con exito');},
          error: () => {this.toast.error('Error al eliminar el cliente');},
      });
    }
  }
  buscarClientePorNombre() {
    const nombre = this.formularioBusqueda.value.nombre;
    this.clientesService.buscarClientesPorNombre(nombre).pipe(
      tap((data: Cliente[]) => {
        this.clientesLista = data;
      })
    ).subscribe({
  
    });
  }   
  agregarCliente() {
    this.estaEditando = false;
    this.clienteSeleccionadoId = null;
    this.mostrarBoton = false;
    this.formularioClientes.reset();
  }
}

