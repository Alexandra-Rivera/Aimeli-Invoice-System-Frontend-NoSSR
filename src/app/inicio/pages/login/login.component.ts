import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../../shared/data-access/auth-service/auth-service.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, JsonPipe, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /*ReactiveForm Variables */
  loginFormulario!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.loginFormulario = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/home']);
      }
    })
  }
  
  onSubmit() {
    if (this.loginFormulario.valid) {
      this.authService.login(this.loginFormulario.value).subscribe({
        next: (response) => {
          console.log("Login successful", response);
        },
        error: (e) => {
          console.error('login failed', e);
          this.errorMessage = 'Credenciales Invalidas. Intente de nuevo'
          this.toast.error(this.errorMessage);
        }
      }) 
    } else {
        this.errorMessage = "Ingresa tus credenciales.";
        this.toast.info(this.errorMessage); 
      }
  }
}
