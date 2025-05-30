import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, RouterLink, RouterLinkActive],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  /*Variables de formulario */
  formularioRegistro!: FormGroup;

  constructor(
    fb: FormBuilder,
    private toast: HotToastService
  ) {
    this.formularioRegistro = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
      initFlowbite();
  }

}
