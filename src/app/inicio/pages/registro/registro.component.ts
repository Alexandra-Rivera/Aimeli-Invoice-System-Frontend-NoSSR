import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { PasswordValidators } from '../../../validators/password.validator';
import { AuthServiceService } from '../../../shared/data-access/auth-service/auth-service.service';
import { Registro } from '../../../shared/interfaces/auth/registro';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  /*Variables de formulario */
  formularioRegistro!: FormGroup;

  constructor(
    fb: FormBuilder,
    private toast: HotToastService,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.formularioRegistro = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, PasswordValidators.strongPassword()]],
      passwordConfirmation: ['', [Validators.required]],
    }, {
      validators: PasswordValidators.matchPassword('password', 'passwordConfirmation')
    });
  }

  ngOnInit(): void {
      initFlowbite();
  }

  get password() {
    return this.formularioRegistro.get('password');
  }

  get confirmPassword() {
    return this.formularioRegistro.get('passwordConfirmation')
  }

  crearUsuario() {
    if (this.formularioRegistro.valid) {
      const nuevoUsuario: Registro = {
        id: 999999999,
        nombre: this.formularioRegistro.controls['nombre'].value,
        apellido: this.formularioRegistro.controls['apellido'].value,
        username: this.formularioRegistro.controls['username'].value,
        password: this.formularioRegistro.controls['password'].value,
        idRol: 2
      }
    this.authService.registro(nuevoUsuario).pipe(
      tap((data: any) => {
        console.log(data);
      })
    ).subscribe({
      next: (r) => {
        this.toast.success(r);
        this.router.navigate(['/inicio']);
      },
      error: (e) => {
        this.toast.error(e);
      }
    })
    }
  }

}
