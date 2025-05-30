import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  ngOnInit(): void {
        initFlowbite();
      }
}
