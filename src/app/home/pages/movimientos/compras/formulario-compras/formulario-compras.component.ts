import { Component, inject } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import {FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { ComprasServiceService } from '../../../../../shared/data-access/compras-service/compras-service.service';
import { Producto } from '../../../../../shared/interfaces/producto/producto';

@Component({
  selector: 'app-formulario-compras',
  imports: [NavComponentComponent, ReactiveFormsModule, JsonPipe, CommonModule, NgIf],
  templateUrl: './formulario-compras.component.html',
  styleUrl: './formulario-compras.component.css'
})
export class FormularioComprasComponent {
  mostrarImagen: { [key: number]: boolean } = {};
  imagenesString: { [key: number]: string } = {};
  montoTotal: {[key: number]: number} = {};
 
  
  metodosPago: string[] = ["Efectivo", "Transferencia", "Tarjeta de credito o debito"];
  proveedores: string[] = ['SHEIN', 'AliExpress', 'Temu'];
  categorias: string[] = ["Accesorios", "Ropa para hombre", "Maquillaje", "Ropa para mujer"];
  productosExistentes: Producto[] = 
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

  /*Injections */
  fb = inject(FormBuilder);
  comprasService = inject(ComprasServiceService);

  /* Definicion de formulario reactivo */
  formularioCompras = this.fb.group ({
    fechaCompra: [''],
    numeroFactura: [''],
    metodoPago: [''],
    proveedor: [''],
    totalCompra: [''],
    productos: new FormArray([
      this.fb.group({
        imagenProducto: [''],
        codigoProducto: [''],
        nombreProducto: [''],
        descripcionProducto: [''],
        categoria:[''],
        cantidadProducto: [''],
        costoUnitario: [''],
        precioVenta: ['']
      })
    ]),
  })


  //Investigar que es ese get 
  get obtenerProductosArray() {
    return this.formularioCompras.get('productos') as FormArray;
  }

  calcularMontoTotalItem(index: number) {
    const costoUnitario = parseFloat(this.obtenerProductosArray.at(index).get('costoUnitario')?.value);
    const cantidad = parseFloat(this.obtenerProductosArray.at(index).get('cantidadProducto')?.value);
    
    /*Producto del costo unitario y la cantidad de articulos*/
    if (costoUnitario && cantidad) {
      this.montoTotal[index] = costoUnitario * cantidad;
    }
  }

  calcularTotalCompra() {
    let total: number = 0;

    for (let i = 0; i <= this.obtenerProductosArray.length - 1; i++) {
      if (this.montoTotal[i]) {
        total += this.montoTotal[i];
      }
    }

    this.formularioCompras.controls.totalCompra.setValue(total.toString());
  }

  handleSubmit() {
    console.log(this.formularioCompras.value);
    alert("Tus productos han sido agregados a inventario!");
  }

  agregarProducto() {
    this.calcularTotalCompra();
    this.obtenerProductosArray.push(
      this.fb.group({
        imagenProducto: [''],
        codigoProducto: [''],
        nombreProducto: [''],
        descripcionProducto: [''],
        categoria:[''],
        cantidadProducto: [''],
        costoUnitario: [''],
        precioVenta: ['']
      }),
    )
  }

  eliminarProducto(index: number) {
    this.obtenerProductosArray.removeAt(index);
  }

  borrarTodosLosCampos() {

    this.formularioCompras.patchValue({
      fechaCompra: '',
      numeroFactura: '',
      proveedor: '',
      metodoPago: '', 
    })
    this.obtenerProductosArray.reset();
    
    for (let i = 0; i < this.obtenerProductosArray.length; i++) {
      this.montoTotal[i] = 0;
    }

    for (let i = 0; i < this.obtenerProductosArray.length; i++) {
        this.mostrarImagen[i] = false;
        this.imagenesString[i] = '';
    }

    this.obtenerProductosArray.clear();
    this.agregarProducto();
  }

  obtenerArrayProductosExistentes(index: number): Producto[] {
    // Por que se ejecuta esta funcion tantas veces
    // Por que al refreshear la pagina, ya no agarra ningun valor al seleccionar ninguna opcion
    const categoriaSeleccionada = this.obtenerProductosArray.at(index).get("categoria")?.value;
    console.log("Categoria seleccionada: ", categoriaSeleccionada);
    let productosEncontrados: Producto[] = this.productosExistentes.filter((producto) => producto.categoria === categoriaSeleccionada);
    console.log(productosEncontrados);
    return productosEncontrados;
  }

  modificacionesProductoExistente(index: number) {
    const dpProductosExistentes = document.getElementById(`productoExistente-${index}`) as HTMLSelectElement;
    console.log("Valor del dropdown", dpProductosExistentes?.value)
    const productoSeleccionado = this.productosExistentes.find((producto) => producto.nombreProducto === dpProductosExistentes?.value);  
    console.log("Producto seleccionado:", productoSeleccionado);

    if (productoSeleccionado) {
      this.obtenerProductosArray.at(index).patchValue({
        codigoProducto: productoSeleccionado.codigoProducto,
        nombreProducto: productoSeleccionado.nombreProducto,
        descripcionProducto: productoSeleccionado.descripcionProducto,
        costoUnitario: productoSeleccionado.costoUnitario,
        precioVenta: productoSeleccionado.precioVenta
      })
    } 

    this.obtenerProductosArray.at(index).get('codigoProducto')?.disable();
    this.obtenerProductosArray.at(index).get('descripcionProducto')?.disable();
    this.obtenerProductosArray.at(index).get('costoUnitario')?.disable();
    this.obtenerProductosArray.at(index).get('precioVenta')?.disable();


    const inputNombreProducto = document.getElementById(`nombreProducto-${index}`) as HTMLInputElement;
    if (inputNombreProducto) {
      inputNombreProducto.style.display = 'none';
    } else {
      this.obtenerProductosArray.at(index).reset();
      this.obtenerProductosArray.at(index).get('nombreProducto')?.enable();
      this.obtenerProductosArray.at(index).get('descripcionProducto')?.enable();
      this.obtenerProductosArray.at(index).get('costoUnitario')?.enable();
      const inputNombreProducto = document.getElementById(`nombreProducto-${index}`) as HTMLInputElement;

      if (inputNombreProducto) {
     inputNombreProducto.style.display = '';
      }
    }
  }

  obtenerImagen(index: number, event: any) {

    const file = event.target.files[0];
    if(file) {
      this.mostrarImagen[index] = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesString[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.mostrarImagen[index] = false;
      this.imagenesString[index] = '';
    }
  }


  /* Service */

  agregarRegistroCompras() {
    this.comprasService.crearRegistroCompra(this.formularioCompras);
  }
}
