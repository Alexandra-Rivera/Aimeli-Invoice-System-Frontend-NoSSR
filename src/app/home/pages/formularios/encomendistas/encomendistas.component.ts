import { Component, inject, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { Encomendista } from '../../../../shared/interfaces/encomendista/encomendista';
import { EncomendistasService } from '../../../../shared/data-access/encomendistas-service/encomendistas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { tap, map } from 'rxjs';
import { EncomendistaDestino } from '../../../../shared/interfaces/encomendista/encomendista-destino';
import { HotToastService, ToastStacking } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-encomendistas',
  imports: [NavComponentComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './encomendistas.component.html',
  styleUrl: './encomendistas.component.css'
})
export class EncomendistasComponent {

  /*Inyeccion de dependencias */
  encomendistasService = inject(EncomendistasService);

  /*Variables */
  protected encomendistas: EncomendistaDestino[] = [];
  protected encomendista_filtrado: any[] = [];
  mostrarBoton = false;

  protected formularioEncomendista: FormGroup;
  protected formularioBusqueda: FormGroup;
  private encomendista!: Encomendista;
  encomendistaSeleccionadoIndex: number | null = null;
  estaEditando = false;
  encomendistaDestino!: EncomendistaDestino;

  constructor(private fb: FormBuilder, private toast: HotToastService) {
    this.formularioEncomendista = fb.group({
      encomendista: ['', Validators.required],
      local: [''],
    });

    this.formularioBusqueda = fb.group({
      encomendista: ['']  
    })
  }

  ngOnInit() {
    this.obtenerEncomendistas();
  }

  seleccionarEncomendista(index: number) {
        this.mostrarBoton = true;
        this.estaEditando = true;
        const encomendistaSeleccionado: EncomendistaDestino = this.encomendistas[index];
        this.encomendistaSeleccionadoIndex = encomendistaSeleccionado.id;
    
        this.formularioEncomendista.controls['encomendista'].patchValue(encomendistaSeleccionado.nombre);
        this.formularioEncomendista.controls['local'].patchValue(encomendistaSeleccionado.local); 
  }
  crearEncomendista() {
    this.estaEditando = false;
    this.encomendistaSeleccionadoIndex = null;
    this.mostrarBoton = false;
    this.formularioEncomendista.reset();
    };

    guardarEncomendista() {
      if (this.estaEditando === true && this.encomendistaSeleccionadoIndex !== null) {
      this.encomendistaDestino = {
        id: this.encomendistaSeleccionadoIndex,
        nombre: this.formularioEncomendista.controls['encomendista'].value ?? "",
        local: this.formularioEncomendista.controls['local'].value ?? "",
      };
      this.encomendistasService.actualizarEncomendista(this.encomendistaDestino).pipe().subscribe({
        next: () => {
          this.toast.success('Encomendista actualizado con éxito');
        },
        error: (error) => {
          this.toast.error('Error al actualizar encomendista');
          console.error(error);
        }
      });
    } else {
      const nuevo_encomendista : EncomendistaDestino = {
        id: 0,
        nombre: this.formularioEncomendista.controls['encomendista'].value ?? "",
        local: this.formularioEncomendista.controls['local'].value ?? "",
      };
      this.encomendistasService.crearEncomendista(nuevo_encomendista).pipe().subscribe({
        next: () => {
          this.toast.success('Encomendista creado con éxito');
        },
        error: (error) => {
          this.toast.error('Error al crear encomendista');
          console.error(error);
        }
      });
    }
    setTimeout(() => {
    window.location.reload();}, 2000);
}
obtenerEncomendistas() {
  this.encomendistasService.obtenerEncomendistas().pipe(
        tap((data: EncomendistaDestino[]) => {
          this.encomendistas = data;
        }) 
        ).subscribe({
      })
    }
  eliminarEncomendista() {
    if (this.encomendistaSeleccionadoIndex) {
      this.encomendistasService.eliminarEncomendista(this.encomendistaSeleccionadoIndex).pipe().subscribe({
        next: () => {
          this.toast.success('Encomendista eliminado con éxito');
          this.obtenerEncomendistas();
        },
        error: (error) => {
          this.toast.error('Error al eliminar encomendista');
          console.error(error);
        }
      });
    }
  }
  agregarEncomendista() {
    this.estaEditando = false;
    this.encomendistaSeleccionadoIndex = null;
    this.mostrarBoton = false;
    this.formularioEncomendista.reset();
  }
}
