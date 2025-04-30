import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function
import { NavComponentComponent } from '../../../components/nav-component/nav-component.component';

@Component({
  selector: 'app-reportes',
  imports: [NavComponentComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
      initFlowbite();
    }

}
