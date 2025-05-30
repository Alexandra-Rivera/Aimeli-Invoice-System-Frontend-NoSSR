import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function
import { AuthServiceService } from '../shared/data-access/auth-service/auth-service.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
