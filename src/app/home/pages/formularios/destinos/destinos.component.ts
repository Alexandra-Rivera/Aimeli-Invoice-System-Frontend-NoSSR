import { Component, inject, OnInit } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { initFlowbite } from 'flowbite';
import { Departamento } from '../../../../shared/interfaces/departamento/departamento';
import { DestinosServiceService } from '../../../../shared/data-access/destinos-service/destinos-service.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MunicipiosPorDepartamento } from '../../../../shared/interfaces/MunicipiosPorDepartamento/municipios-por-departamento';
import { EncomendistasService } from '../../../../shared/data-access/encomendistas-service/encomendistas.service';
import { EncomendistaDestino } from '../../../../shared/interfaces/encomendista/encomendista-destino';
import { Destino } from '../../../../shared/interfaces/destino/destino';

@Component({
  selector: 'app-destinos',
  imports: [NavComponentComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.css'
})
export class DestinosComponent implements OnInit {
  destinosService = inject(DestinosServiceService);
  encomendistasService = inject(EncomendistasService);
  fb = inject(FormBuilder);

  protected departamentos: Departamento[] = [];
  protected municipios: MunicipiosPorDepartamento[] = [];
  protected encomendistas: EncomendistaDestino[] = [];
  protected destinos: Destino[] = [];
  protected formularioDestino!: FormGroup;
  protected mostrarBoton: boolean = false;
  protected destinoSeleccionadoId: number | null = null;
  protected estaEditando: boolean = false;

  constructor() {
    this.formularioDestino = this.fb.group({
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      punto_entrega: ["", Validators.required],
      encomendista: ["", Validators.required],
    });
  }

  ngOnInit() {
    initFlowbite();
    this.obtenerDepartamentos();
    this.formularioDestino.get('departamento')?.valueChanges.subscribe((idDepartamento: number) => {
      if (idDepartamento) {
        this.obtenerMunicipiosPorDepartamento(idDepartamento);
      }
    });
    this.obtenerDestinos();
    this.obtenerEncomendista();
  }

  obtenerDepartamentos() {
    this.destinosService.obtenerDepartamentos().pipe(
      tap((data: Departamento[]) => {
        console.log(data);
        this.departamentos = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => console.log("Actividad finalizada")
    });
  }

  obtenerMunicipiosPorDepartamento(id: number) {
    this.destinosService.obtenerMunicipiosPorDepartamento(id).pipe(
      tap((data: MunicipiosPorDepartamento[]) => {
        console.log(data);
        this.municipios = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => console.log("Actividad finalizada")
    });
  }

  obtenerEncomendista() {
    this.encomendistasService.obtenerEncomendistas().pipe(
      tap((data: EncomendistaDestino[]) => {
        console.log(data);
        this.encomendistas = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => console.log("Actividad finalizada")
    });
  }

  obtenerDestinos() {
    this.destinosService.obtenerDestinos().pipe(
      tap((data: Destino[]) => {
        console.log(data);
        this.destinos = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => console.log("Actividad finalizada")
    });
  }

  SeleccionarDestino(index: number) {
    this.estaEditando = true;
    this.mostrarBoton = true;
    const destino: Destino = this.destinos[index];
    this.destinoSeleccionadoId = destino.id;
    console.log("Destino seleccionado:", destino);

    this.formularioDestino.patchValue({
      departamento: destino.departamentoId,
      municipio: destino.municipioId,
      punto_entrega: destino.puntoEntrega,
      encomendista: destino.encomendistaId,
    });
  }

  agregarDestino() {
    if (this.formularioDestino.valid) {
      if (this.estaEditando && this.destinoSeleccionadoId !== null) {
        const destino: Destino = {
          id: this.destinoSeleccionadoId,
          departamentoId: this.formularioDestino.value.departamento,
          municipioId: this.formularioDestino.value.municipio,
          puntoEntrega: this.formularioDestino.value.punto_entrega,
          encomendistaId: this.formularioDestino.value.encomendista,
          departamento: this.departamentos.find(d => d.id === this.formularioDestino.value.departamento)?.departamento || '',
          municipio: this.municipios.find(m => m.id === this.formularioDestino.value.municipio)?.municipio || '',
          encomendista: this.encomendistas.find(e => e.id === this.formularioDestino.value.encomendista)?.nombre || '',
        };

        this.destinosService.actualizarDestino(destino).subscribe({
          next: (m) => console.log(m),
          error: (e) => console.log(e),
          complete: () => {
            console.log("Completado");
            this.obtenerDestinos();
            this.formularioDestino.reset();
            this.estaEditando = false;
            this.mostrarBoton = false;
            this.destinoSeleccionadoId = null;
          }
        });
      } else {
        const formularioValue = this.formularioDestino.value;
        const nuevoDestino: Destino = {
          id: 0,
          puntoEntrega: formularioValue.punto_entrega,
          encomendista: this.encomendistas.find(e => e.id === formularioValue.encomendista)?.nombre || '',
          departamentoId: formularioValue.departamento,
          municipioId: formularioValue.municipio,
          departamento: this.departamentos.find(d => d.id === formularioValue.departamento)?.departamento || '',
          municipio: this.municipios.find(m => m.id === formularioValue.municipio)?.municipio || '',
          encomendistaId: formularioValue.encomendista
        };

        console.log('Nuevo destino:', nuevoDestino);

        this.destinosService.crearDestino(nuevoDestino).subscribe({
          next: (response) => console.log('Destino creado:', response),
          error: (error) => console.error('Error al crear destino:', error),
          complete: () => {
            console.log('Petición completada');
            this.obtenerDestinos();
            this.formularioDestino.reset();
          }
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  actualizarDestino() {
    if (this.formularioDestino.valid && this.destinoSeleccionadoId !== null) {
      const formularioValue = this.formularioDestino.value;
      const destinoActualizado: Destino = {
        id: this.destinoSeleccionadoId,
        puntoEntrega: formularioValue.punto_entrega,
        encomendista: this.encomendistas.find(e => e.id === formularioValue.encomendista)?.nombre || '',
        departamentoId: formularioValue.departamento,
        municipioId: formularioValue.municipio,
        departamento: this.departamentos.find(d => d.id === formularioValue.departamento)?.departamento || '',
        municipio: this.municipios.find(m => m.id === formularioValue.municipio)?.municipio || '',
        encomendistaId: formularioValue.encomendista
      };

      console.log('Destino actualizado:', destinoActualizado);

      this.destinosService.actualizarDestino(destinoActualizado).subscribe({
        next: (response) => console.log('Destino actualizado:', response),
        error: (error) => console.error('Error al actualizar destino:', error),
        complete: () => {
          console.log('Petición completada');
          this.obtenerDestinos();
          this.formularioDestino.reset();
          this.estaEditando = false;
          this.mostrarBoton = false;
          this.destinoSeleccionadoId = null;
          
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }
    eliminarDestino() {
    if (this.estaEditando === true && this.destinoSeleccionadoId !== null) {
      this.destinosService.eliminarDestino(this.destinoSeleccionadoId).pipe().subscribe(
        {
          next: (m) => console.log(m),
          error: (e) => console.log(e),
          complete: () => console.log("completado")
        }
      );
    }

    window.location.reload();
  }
}
