import { Component, OnInit } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import { Datepicker, DatepickerInterface, DatepickerOptions, Dropdown, DropdownInterface, DropdownOptions, initFlowbite, InstanceOptions } from 'flowbite';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common'; 

@Component({
  selector: 'app-formulario-compras',
  imports: [NavComponentComponent, ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './formulario-compras.component.html',
  styleUrl: './formulario-compras.component.css'
})
export class FormularioComprasComponent implements OnInit {
  metodosPago: string[] = ["Efectivo", "Transferencia", "Tarjeta de credito o debito"];
  proveedores: string[] = ['SHEIN', 'AliExpress', 'Temu'];
  categorias: string[] = ["Accesorios", "Ropa para hombre", "Maquillaje", "Ropa para mujer"];

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can go here
    initFlowbite(); // Uncomment if you need to initialize Flowbite here
  }

  // ngAfterViewInit() {
  //   initFlowbite();
  // }

  formularioCompras: FormGroup = new FormGroup({
    fechaCompra: new FormControl(""),
    numeroFactura: new FormControl(""),
    metodoPago: new FormControl(""),
    proveedor: new FormControl(""),

    nombreProducto: new FormControl(""),
    descripcionProducto: new FormControl(""),
    categoria: new FormControl(""),
    cantidadProducto: new FormControl(""),
    costoUnitario: new FormControl(""),
    precioVenta: new FormControl("")
  })
}
