import { Component, inject, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ClienteServiceService } from '../../../../shared/data-access/cliente-service/cliente.service';
import { Cliente } from '../../../../shared/interfaces/cliente/cliente';
import { tap } from 'rxjs';

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
  constructor() {
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
    console.log(this.formularioClientes.value);
  }

  ngOnInit() {
    this.ObternerClientes();
  }
  ObternerClientes() {
        this.clientesService.obtenerClientes().pipe(
          tap((data: Cliente[]) => {
            console.log(data);
            this.clientesLista = data;
          })
        ).subscribe({
          next: (message) => console.log(message),
          error: (error) => console.error(error),
          complete: () => console.log("Actividad finalizada")
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
        console.log(data);
        this.ObternerClientes();
        this.formularioClientes.reset();
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => console.log("Actividad finalizada")
    });
  }
  editarCliente(cliente: Cliente) {
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
          console.log(data);
          this.ObternerClientes();
          this.formularioClientes.reset();
          this.estaEditando = false;
          this.clienteSeleccionadoId = null;
        })
      ).subscribe({
        next: (message) => console.log(message),
        error: (error) => console.error(error),
        complete: () => console.log("Actividad finalizada")
      });
    }
  }
  eliminarCliente() {
    if (this.clienteSeleccionadoId !== null) {
      this.clientesService.eliminarCliente(this.clienteSeleccionadoId).pipe(
        tap(() => {
          console.log(`Cliente con ID ${this.clienteSeleccionadoId} eliminado`);
          this.ObternerClientes();
          this.formularioClientes.reset();
          this.estaEditando = false;
        })
      ).subscribe({
        next: (message) => console.log(message),
        error: (error) => console.error(error),
        complete: () => console.log("Actividad finalizada")
      });
    }
  }
  buscarClientePorNombre() {
    const nombre = this.formularioBusqueda.value.nombre;
    this.clientesService.buscarClientesPorNombre(nombre).pipe(
      tap((data: Cliente[]) => {
        console.log(data);
        this.clientesLista = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => console.log("Actividad finalizada")
    });
  }   
}

