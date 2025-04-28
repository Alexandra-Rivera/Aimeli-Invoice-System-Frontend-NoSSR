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
  idmetodoPago!: number;
  idProveedor!: number;
  metodosPago: string[] = ["Efectivo", "Transferencia", "Tarjeta de credito o debito"];
  proveedores: string[] = ['SHEIN', 'AliExpress', 'Temu'];

  proveedorSeleccionado: string = "";
  metodoPagoSeleccionado: string = "";

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
    estado: new FormControl(""),
    fechaCreacion: new FormControl(""),
    fechaActualizacon: new FormControl(""),
    idMetodoPago: new FormControl(this.idmetodoPago),
    idProveedor: new FormControl(null),
  })

  //Dropdown de metodo de pago

  seleccionarMetodoPago(metodoPago: string) {
    this.metodoPagoSeleccionado = metodoPago;
  }

  //Dropdown de proveedores
  seleccionarProveedor(proveedor: string) {
    this.proveedorSeleccionado = proveedor;
  }
}
