import { Component, inject, Input } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { Encomendista } from '../../../../shared/interfaces/encomendista/encomendista';
import { EncomendistasService } from '../../../../shared/data-access/encomendistas-service/encomendistas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { tap, map } from 'rxjs';
import { EncomendistaDestino } from '../../../../shared/interfaces/encomendista/encomendista-destino';

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

  constructor(private fb: FormBuilder) {
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
    console.log("id seleccionado:", index);
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
      if (this.estaEditando && this.encomendistaSeleccionadoIndex !== null) {
        this.encomendista = {
          id: this.encomendistaSeleccionadoIndex,
          nombre: this.formularioEncomendista.value.encomendista,
          local: this.formularioEncomendista.value.local ?? '',
          estado: true,
          fechaCreacion: new Date(),
          fechaActualizacion: new Date()
        };
        this.encomendistasService.crearEncomendista(this.encomendista).pipe().subscribe({
           next: (response) => console.log(response),
           error: (e) => console.error(e),});}
    else{
      const nuevo_encomendista: EncomendistaDestino = {
        id: 0,
        nombre: this.formularioEncomendista.value.encomendista,
        local: this.formularioEncomendista.value.local ?? '',
      };
      this.encomendistasService.crearEncomendista(nuevo_encomendista).pipe().subscribe({
        error: (e) => console.error(e)
      
      })
      }
      window.location.reload();
}
obtenerEncomendistas() {
  this.encomendistasService.obtenerEncomendistas().pipe(
        tap((data: EncomendistaDestino[]) => {
          this.encomendistas = data;
          console.log(this.encomendistas);
        }) 
        ).subscribe({
        error: (e) => console.log(e),
        complete: () => console.log("Completado")
      })
    }
  eliminarEncomendista() {
    if (this.encomendistaSeleccionadoIndex) {
      console.log("Index a elimiar:", this.encomendistaSeleccionadoIndex);
      this.encomendistasService.eliminarEncomendista(this.encomendistaSeleccionadoIndex).pipe().subscribe({
        next: (message) => {console.log(message); window.location.reload();},
        error: (e) => console.error(e.mensaje),
        complete: () => console.log("Operacion completada con exito"),
      });
    }
  }
}
