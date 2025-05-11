import { Component, inject, OnInit } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function
import { Departamento } from '../../../../shared/interfaces/departamento/departamento';
import { DestinosServiceService } from '../../../../shared/data-access/destinos-service/destinos-service.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Municipio } from '../../../../shared/interfaces/municipio/municipio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Encomendista } from '../../../../shared/interfaces/encomendista/encomendista';

@Component({
  selector: 'app-destinos',
  imports: [NavComponentComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.css'
})
export class DestinosComponent {
  destinosService = inject(DestinosServiceService);
  fb = inject(FormBuilder);

  protected departamentos: Departamento[] = [];
  protected municipios: Municipio[] = [];
  protected encomendistas: Encomendista[] = [];
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
      complete: () => ("Actividad finalizada")
    })
  }
}
