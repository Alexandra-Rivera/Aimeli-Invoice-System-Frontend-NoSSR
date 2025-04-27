import { Component, OnInit } from '@angular/core';
import { NavComponentComponent } from '../../../../components/nav-component/nav-component.component';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function

@Component({
  selector: 'app-destinos',
  imports: [NavComponentComponent],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.css'
})
export class DestinosComponent implements OnInit {
  constructor() { }
  
    ngOnInit(): void {  
        initFlowbite();
      }

}
