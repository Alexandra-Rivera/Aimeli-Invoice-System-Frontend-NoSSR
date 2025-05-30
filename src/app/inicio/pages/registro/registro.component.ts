import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  ngOnInit(): void {
      initFlowbite();
    }

}
