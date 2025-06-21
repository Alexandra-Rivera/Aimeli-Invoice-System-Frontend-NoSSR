import { Component, inject, OnInit } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function
import { Departamento } from '../../../../shared/interfaces/departamento/departamento';
import { DestinosServiceService } from '../../../../shared/data-access/destinos-service/destinos-service.service';
import { tap } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';
import { Municipio } from '../../../../shared/interfaces/municipio/municipio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Encomendista } from '../../../../shared/interfaces/encomendista/encomendista';
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
export class DestinosComponent {
  destinosService = inject(DestinosServiceService);
  encomendistasService = inject(EncomendistasService);
  fb = inject(FormBuilder);


  protected departamentos: Departamento[] = [];
  protected municipios: MunicipiosPorDepartamento[] = [];
  protected encomendistas: EncomendistaDestino[] = [];
  protected destinos: Destino[] = [];
  protected formularioDestino!: FormGroup;

  constructor() { 
    this.formularioDestino = this.fb.group({
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      punto_entrega: ["", Validators.required],
      encomendista: ["", Validators.required],
    })
  }

  ngOnInit() {
    this.obtenerDepartamentos();
    this.formularioDestino.get('departamento')?.valueChanges.subscribe((idDepartamento: number) => {
    if (idDepartamento) {
      this.obtenerMunicipiosPorDepartamento(idDepartamento);
    }
  });
  this.destinosService.obtenerDestinos().subscribe(data => {
  this.destinos = data;
});
  this.obtenerEncomendista();}

  obtenerDepartamentos() {
    this.destinosService.obtenerDepartamentos().pipe(
      tap((data: Departamento[]) => {
        console.log(data);
        this.departamentos = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => ("Actividad finalizada")
    })
  }
  /*  Obtener municipios por departamento seleccionado */
  obtenerMunicipiosPorDepartamento(id: number) {
    this.destinosService.obtenerMunicipiosPorDepartamento(id).pipe(
      tap((data: MunicipiosPorDepartamento[]) => {
        console.log(data);
        this.municipios = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => ("Actividad finalizada")
    })

    }
    obtenerEncomendista() {
      /*    Obtener encomendistas */
    this.encomendistasService.obtenerEncomendistas().pipe(
      tap((data: EncomendistaDestino[]) => {
        console.log(data);
        this.encomendistas = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => ("Actividad finalizada")
    });
  }
  /* Agregar un nuevo destino */
agregarDestino() {
  if (this.formularioDestino.valid) {
    const formularioValue = this.formularioDestino.value;
    const nuevoDestino:Destino = {
      id: 999999999,
      puntoEntrega: formularioValue.punto_entrega,
      encomendista: this.encomendistas.find(e => e.id === formularioValue.encomendista)?.nombre || '',
      departamentoId: formularioValue.departamento,
      municipioId: formularioValue.municipio,
      departamento: this.departamentos.find(d => d.id === formularioValue.departamento)?.departamento || '',
      municipio: this.municipios.find(m => m.id === formularioValue.municipio)?.municipio || '',
      encomendistaId: formularioValue.encomendista
    };
    console.log('Nuevo destino:', nuevoDestino);

    this.destinosService.crearDestino(nuevoDestino).pipe().subscribe({
      next: (response) => {
        console.log('Destino creado:', response);
      },
      error: (error) => {
        console.error('Error al crear destino:', error);
      },
      complete: () => {
        console.log('Petición completada');
      }
    });

    this.formularioDestino.reset(); // Resetea el formulario después de agregar el destino
  } else {
    console.error('Formulario inválido');
  }
  
}
/*Editar un destino */
editarDestino(destino_id: number) {
  const destino = this.destinos.find(d => d.id === destino_id);

  if (!destino) {
    console.error('Destino no encontrado con ID:', destino_id);
    return;
  }

  this.formularioDestino.patchValue({
    departamento: destino.departamentoId,
    municipio: destino.municipioId,
    punto_entrega: destino.puntoEntrega,
    encomendista: destino.encomendistaId
  });

  console.log('Destino a editar:', destino);
}
  /*Obtener todos los destinos */
  obtenerDestinos() {
    this.destinosService.obtenerDestinos().pipe(
      tap((data: Destino[]) => {
        console.log(data);
        this.destinos = data;
      })
    ).subscribe({
      next: (message) => console.log(message),
      error: (error) => console.error(error),
      complete: () => ("Actividad finalizada")
    })
  }
}