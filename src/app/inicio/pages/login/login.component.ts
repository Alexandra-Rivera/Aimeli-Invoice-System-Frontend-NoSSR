import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, JsonPipe, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /*ReactiveForm Variables */
  login!: FormGroup;

  constructor(
    fb: FormBuilder 
  ) {
    this.login = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
}
