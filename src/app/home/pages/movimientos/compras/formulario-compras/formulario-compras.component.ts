import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ComprasServiceService } from '../../../../../shared/data-access/compras-service/compras-service.service';
import { ProductoExistente } from '../../../../../shared/interfaces/compras/producto-existente';

@Component({
  selector: 'app-formulario-compras',
  imports: [NavComponentComponent, ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './formulario-compras.component.html',
  styleUrl: './formulario-compras.component.css'
})
export class FormularioComprasComponent {

  metodosPago: string[] = ["Efectivo", "Transferencia", "Tarjeta de credito o debito"];
  proveedores: string[] = ['SHEIN', 'AliExpress', 'Temu'];
  categorias: string[] = ["Accesorios", "Ropa para hombre", "Maquillaje", "Ropa para mujer"];
  productosExistentes: ProductoExistente[] = 
  [
    {
    "codigoProducto": "ACC001",
    "nombreProducto": "Auriculares Inalámbricos",
    "descripcionProducto": "Auriculares Bluetooth con cancelación de ruido y hasta 20 horas de reproducción.",
    "categoria": "Accesorios",
    "costoUnitario": 85.25,
    "precioVenta": 129.75
    },
    {
      "codigoProducto": "ACC002",
      "nombreProducto": "Pulsera de mano tecnologica",
      "descripcionProducto": "Pulsera de mano con reloj digital de hasta 20 horas de duracion.",
      "categoria": "Accesorios",
      "costoUnitario": 128.25,
      "precioVenta": 220.75
      },
    {
      "codigoProducto": "RMH001",
      "nombreProducto": "Camiseta Algodón Premium",
      "descripcionProducto": "Camiseta de manga corta 100% algodón orgánico.",
      "categoria": "Ropa para hombre",
      "costoUnitario": 25.50,
      "precioVenta": 39.99
    },
    {
      "codigoProducto": "RMH002",
      "nombreProducto": "Pantalón Vaquero Recto",
      "descripcionProducto": "Pantalón vaquero corte recto clásico en denim resistente.",
      "categoria": "Ropa para mujer",
      "costoUnitario": 55.00,
      "precioVenta": 79.50
    },
    {
      "codigoProducto": "MAQ002",
      "nombreProducto": "Paleta de Sombras Neutras",
      "descripcionProducto": "Paleta con 12 tonos neutros y acabado mate y brillante.",
      "categoria": "Maquillaje",
      "costoUnitario": 42.75,
      "precioVenta": 65.99
    },
    {
      "codigoProducto": "MAQ001",
      "nombreProducto": "Base de Maquillaje Líquida",
      "descripcionProducto": "Base de cobertura media con acabado natural.",
      "categoria": "Maquillaje",
      "costoUnitario": 30.25,
      "precioVenta": 45.00
    }
  ];
  
  constructor() { }

  ngOnInit() {
    
  }

  /*Injections */
  fb = inject(FormBuilder);
  comprasService = inject(ComprasServiceService);

  /* Definicion de formulario reactivo */
  formularioCompras = this.fb.group ({
    fechaCompra: '',
    numeroFactura: '',
    metodoPago: '',
    proveedor: '',
    productos: new FormArray([
      this.fb.group({
        nombreProducto: '',
        descripcionProducto: '',
        categoria:'',
        cantidadProducto: '',
        costoUnitario: '',
        precioVenta: ''
      })
    ])
  })

  calcularTotalCompra(): number {
    // tomar todos los costos unitarios de los productos añadidos y sumarlos
    let total: number = 0;

    return total;
  }

  handleSubmit() {
    console.log(this.formularioCompras.value);
  }

  agregarProducto() {
    this.formularioCompras.controls.productos.push(
      new FormGroup({
        nombreProducto: new FormControl(""),
        descripcionProducto: new FormControl(""),
        categoria: new FormControl(""),
        cantidadProducto: new FormControl(""),
        costoUnitario: new FormControl(""),
        precioVenta: new FormControl("")
      }),
    )

    this.calcularTotalCompra();
  }

  eliminarProducto(indexNumber: number) {
    this.formularioCompras.controls.productos.removeAt(indexNumber);
  }

  borrarTodosLosCampos() {
    let inputFechaCompra = document.getElementById("fechaCompra") as HTMLInputElement;
    let inputNumeroFactura = document.getElementById("numeroFactura") as HTMLInputElement;
    let dpProveedor = document.getElementById("proveedor") as HTMLSelectElement;
    let dpMetodoPago = document.getElementById("metodoPago") as HTMLSelectElement;

    this.formularioCompras.controls.productos.clear();

    inputFechaCompra.value = "";
    inputNumeroFactura.value = "";

    dpProveedor.selectedIndex = 0;
    dpMetodoPago.selectedIndex = 0;
  }

  obtenerArrayProductosExistentes(index: number): ProductoExistente[] {
    let dpCategorias = document.getElementById("categoriaProducto-"+ index) as HTMLSelectElement;
    let nuevoProductosExistentes = this.productosExistentes.filter((producto) => producto.categoria == dpCategorias.value);
  
    return nuevoProductosExistentes;
  }

  modificacionesProductoExistente(index: number) {
    /*Declaracion de campos a llenar */
    let dpProductosExistentes = document.getElementById("productoExistente-"+index) as HTMLSelectElement;
    let inputCodigoProducto = document.getElementById("codigoProducto-"+index) as HTMLInputElement;
    let inputNombreProducto = document.getElementById("nombreProducto-"+index) as HTMLInputElement;
    let inputDescripcionProducto = document.getElementById("descripcionProducto-"+index) as HTMLInputElement;
    let inputCostoUnitario = document.getElementById("costoUnitario-"+ index) as HTMLInputElement;
    let inputPrecioVenta = document.getElementById("precioVenta-"+ index) as HTMLInputElement;


    /* Encontrando el index del producto seleccionado */
    let productoSeleccionadoIndex: number = this.productosExistentes.findIndex((producto) => producto.nombreProducto == dpProductosExistentes.value);
    let productoSeleccionado: ProductoExistente = this.productosExistentes[productoSeleccionadoIndex];

    /*Desaparece el Input de nombreProducto */
    inputNombreProducto.style.display = "none";

    /* Se dishabilitan los inputs para que no se puedan editar y los input numericos se convierten a texto */
    inputCostoUnitario.disabled = true;
    inputCostoUnitario.type = "text";
    inputPrecioVenta.disabled = true;
    inputPrecioVenta.type = "text";
    inputDescripcionProducto.disabled = true;

    /* Se les asigna los valores del producto seleccionado a los input correspondientes */
    inputCodigoProducto.value = productoSeleccionado.codigoProducto;
    inputDescripcionProducto.value = productoSeleccionado.descripcionProducto;
    inputCostoUnitario.value = '$' + productoSeleccionado.costoUnitario.toString();
    inputPrecioVenta.value = '$' + productoSeleccionado.precioVenta.toString();
  }

  /* Service */

  agregarRegistroCompras() {
    this.comprasService.crearRegistroCompra(this.formularioCompras);
  }
}
