import { Component, inject } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import {Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { ComprasServiceService } from '../../../../../shared/data-access/compras-service/compras-service.service';
import { Producto } from '../../../../../shared/interfaces/producto/producto';
import { Categoria } from '../../../../../shared/interfaces/categoria/categoria';
import { tap } from 'rxjs';
import { Proveedor } from '../../../../../shared/interfaces/proveedor/proveedor';
import { MetodoPago } from '../../../../../shared/interfaces/metodopago/metodo-pago';
import { CategoriasServiceService } from '../../../../../shared/data-access/categorias-service/categorias-service.service';
import { ProveedoresServiceService } from '../../../../../shared/data-access/proveedores-service/proveedores-service.service';
import { FacturaCompras } from '../../../../../shared/interfaces/compras/factura-compras';
import { RegistroCompras } from '../../../../../shared/interfaces/compras/registro-compras';

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
  totalCompra: number | null = null;
 
  proveedores: Proveedor[] = [];
  metodosPago: MetodoPago[] = [];
  categorias: Categoria[] = [];
  productosExistentes: Producto[] = 
  [
    {
      "id": 1,
      "imagen": "https://promart.vteximg.com.br/arquivos/ids/7354120-1000-1000/image-0.jpg?v=638258415095200000",
      "nombre": "Auriculares Inalámbricos",
      "descripcion": "Auriculares Bluetooth con cancelación de ruido y hasta 20 horas de reproducción.",
      "categoriaDTO": {
        "id": 1,
      }, 
      "cantidad": 5,
      "costoUnitario": 85.25,
      "precioVenta": 129.75
    },
    {
      "id": 2,
      "imagen": "https://www.tecnoseguro.com/media/k2/items/cache/dc0900c4858a2f0dce82ed3898356bb3_XL.jpg",
      "nombre": "Pulsera de mano tecnologica",
      "descripcion": "Pulsera de mano con reloj digital de hasta 20 horas de duracion.",
      "categoriaDTO": {
        "id": 1
      },
      "cantidad": 5,
      "costoUnitario": 128.25,
      "precioVenta": 220.75
      },
    {
      "id": 3, 
      "imagen": "https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87000606_01_B.jpg?imwidth=2048&imdensity=1&ts=1727890470817",
      "nombre": "Camiseta Algodón Premium",
      "descripcion": "Camiseta de manga corta 100% algodón orgánico.",
      "categoriaDTO": {
        "id": 1,
      },
      "cantidad": 5,
      "costoUnitario": 25.50,
      "precioVenta": 39.99
    },
    {
      "id": 4, 
      "imagen": "https://www.korner.es/uploads/media/images/756x756/221BD26036_00_1.jpg",
      "nombre": "Pantalón Vaquero Recto",
      "descripcion": "Pantalón vaquero corte recto clásico en denim resistente.",
      "categoriaDTO": {
        "id": 1
      },
      "cantidad": 5,
      "costoUnitario": 55.00,
      "precioVenta": 79.50
    },
    {
      "id": 5, 
      "imagen": "https://ateneaprofesional.com/cdn/shop/files/Atenea_Ecommerce_Oct_236164.jpg?v=1743916068",
      "nombre": "Paleta de Sombras Neutras",
      "descripcion": "Paleta con 12 tonos neutros y acabado mate y brillante.",
      "categoriaDTO": {
        "id": 1
      },
      "cantidad": 5,
      "costoUnitario": 42.75,
      "precioVenta": 65.99
    },
    {
      "id": 6,
      "imagen": "https://siman.vtexassets.com/arquivos/ids/6028880/104587559-1.jpg?v=638592533250230000",
      "nombre": "Base de Maquillaje Líquida",
      "descripcion": "Base de cobertura media con acabado natural.",
      "categoriaDTO": {
        "id": 1
      },
      "cantidad": 5,
      "costoUnitario": 30.25,
      "precioVenta": 45.00
    }
  ];


  /*Injections */
  fb = inject(FormBuilder);
  comprasService = inject(ComprasServiceService);
  categoriasService = inject(CategoriasServiceService);
  proveedoresService = inject(ProveedoresServiceService);

  /* Definicion de formulario reactivo */
  formularioCompras = this.fb.group ({
      fechaCompra: ['', Validators.required],
      numeroFactura: ['', Validators.required],
      metodoPago: ['', Validators.required],
      proveedor: ['', Validators.required],


    productos: new FormArray([
      this.fb.group({
        imagenProducto: ['', Validators.required],
        codigoProducto: ['', Validators.required],
        nombreProducto: ['', Validators.required],
        descripcionProducto: ['', Validators.required],
        categoria: ['', Validators.required],
        cantidadProducto: ['', Validators.required],
        costoUnitario: ['', Validators.required],
        precioVenta: ['', Validators.required]
      })
    ]),
  });

  constructor() { 
    // let esValido = this.formularioCompras.valid;
  }

  ngOnInit() {
    this.obtenerProveedores();
    this.obtenerMetodoDePago();
    this.obtenerCategorias();
  }
  //Investigar que es ese get 
  get obtenerProductosArray() {
    // return this.formularioCompras.get('productos') as FormArray;
    return this.formularioCompras.controls['productos'] as FormArray;
  }


  calcularTotalCompra() {
    let total: number = 0;

    for (let i = 0; i <= this.obtenerProductosArray.length - 1; i++) {
      if (this.montoTotal[i]) {
        total += this.montoTotal[i];
      }
    }
    
    this.totalCompra = parseFloat(total.toFixed(2));
  }

  calcularMontoTotalItem(index: number) {
    const costoUnitario = parseFloat(this.obtenerProductosArray.at(index).get('costoUnitario')?.value);
    const cantidad = parseFloat(this.obtenerProductosArray.at(index).get('cantidadProducto')?.value);
    /*Producto del costo unitario y la cantidad de articulos*/

    if (costoUnitario && cantidad) {
      const operacion = costoUnitario * cantidad;
      this.montoTotal[index] = parseFloat(operacion.toFixed(2));
    }

    this.calcularTotalCompra();
    }

  guardarFactura() {
    let productos: Producto[] = [];

    for (let i = 0; i < this.obtenerProductosArray.controls.length; i++) {
      let producto = {
        id: 999999999,
        imagen: this.obtenerProductosArray.controls[i].get('imagenProducto')?.value,
        nombre: this.obtenerProductosArray.controls[i].get('nombreProducto')?.value,
        descripcion: this.obtenerProductosArray.controls[i].get('descripcionProducto')?.value,
        categoriaDTO: {
          id: this.obtenerProductosArray.controls[i].get('categoria')?.value
        },
        cantidad: this.obtenerProductosArray.controls[i].get('cantidadProducto')?.value,
        costoUnitario: this.obtenerProductosArray.controls[i].get('costoUnitario')?.value,
        precioVenta: this.obtenerProductosArray.controls[i].get('precioVenta')?.value
      }
      productos.push(producto); 
    }
 
    const factura_compras: RegistroCompras  = {
      id: 999999999,
      compra: {
        id: 999999999,
        fechaCompra: this.formularioCompras.get('fechaCompra')?.value ?? "",
        numeroFactura: this.formularioCompras.get('numeroFactura')?.value ?? "",
        metodoPagoDTO: {
          id: parseInt(this.formularioCompras.get('metodoPago')?.value ?? ""),
        },
        proveedorDTO: {
          id: parseInt(this.formularioCompras.get('proveedor')?.value ?? ""),
        },
      },
      
      productos: productos
    }

    console.log("Factura: ", factura_compras);
    this.comprasService.crearRegistroCompra(factura_compras).pipe().subscribe(
      {
        next: (m) => console.log("El registro fue agregado exitosamente: ", m),
        error: (e) => console.error(e), 
        complete: () => console.log("El registro de factura fue agregado exitosamente. Completado.")
      }
    );
  }

  agregarProducto() {
    if(this.categorias) {
      this.calcularTotalCompra();
      this.obtenerProductosArray.push(
        this.fb.group({
        imagenProducto: ['', Validators.required],
        codigoProducto: ['', Validators.required],
        nombreProducto: ['', Validators.required],
        descripcionProducto: ['', Validators.required],
        categoria: ['', Validators.required],
        cantidadProducto: ['', Validators.required],
        costoUnitario: ['', Validators.required],
        precioVenta: ['', Validators.required]
        }),
      )
    }

  }

  eliminarProducto(index: number) {
    this.obtenerProductosArray.removeAt(index);
    this.imagenesString[index] = '';
    this.mostrarImagen[index] = false; 

  }

  borrarTodosLosCampos() {

    // this.formularioCompras.patchValue({
    //   fechaCompra: '',
    //   numeroFactura: '',
    //   proveedor: '',
    //   metodoPago: '', 
    // })
    
    // for (let i = 0; i < this.obtenerProductosArray.length; i++) {
    //   this.montoTotal[i] = 0;
    // }

    // for (let i = 0; i < this.obtenerProductosArray.length; i++) {
    //   this.mostrarImagen[i] = false;
    //   this.imagenesString[i] = '';
    // }

    // for (let i = 0; i < this.obtenerProductosArray.length; i++) {
    //   this.obtenerProductosArray.at(i).patchValue({
    //     codigoProducto: '',
    //     nombreProducto: '',
    //     categoria: '',
    //     descripcionProducto: '',
    //     costoUnitario: '',
    //     precioVenta: ''
    //   })
    // }
    // this.obtenerProductosArray.clear();
    // this.agregarProducto();

    window.location.reload();
  }

  obtenerArrayProductosExistentes(index: number): Producto[] {
    const categoria_index: number = parseInt(this.obtenerProductosArray.at(index).get("categoria")?.value);
    const categoria = this.categorias.find((categoria) => categoria.id === categoria_index);
    return this.productosExistentes.filter((producto) => producto.categoriaDTO.id === categoria?.id);
  }

  modificacionesProductoExistente(index: number) {

    //El index ingresado como parametro representa el item donde se van a efectuar las siguientes modificaciones: 

    /*Ubicando valores del dropdown de productos existentes para acceder al producto seleccionado */
    const dpProductosExistentes = document.getElementById(`productoExistente-${index}`) as HTMLSelectElement;
    const productoSeleccionado = this.productosExistentes.find((producto) => producto.nombre === dpProductosExistentes?.value);  

    if (productoSeleccionado) {
      this.obtenerProductosArray.at(index).patchValue({
        nombreProducto: productoSeleccionado.nombre,
        descripcionProducto: productoSeleccionado.descripcion,
        costoUnitario: productoSeleccionado.costoUnitario,
        precioVenta: productoSeleccionado.precioVenta
      })
    } 

    this.imagenesString[index] = productoSeleccionado?.imagen ?? "";
    this.mostrarImagen[index] = true;
    this.obtenerProductosArray.at(index).get('imagenProducto')?.disable();
    this.obtenerProductosArray.at(index).get('codigoProducto')?.disable();
    this.obtenerProductosArray.at(index).get('descripcionProducto')?.disable();
    this.obtenerProductosArray.at(index).get('costoUnitario')?.disable();
    this.obtenerProductosArray.at(index).get('precioVenta')?.disable();


    /*Ubicando inputs a desaparecer: input de nombre de producto e input de imagenes  */
    const inputNombreProducto = document.getElementById(`nombreProducto-${index}`) as HTMLInputElement;
    const inputImagenText = document.getElementById(`inputImagenText-${index}`) as HTMLElement;
    const inputFile  = document.getElementById(`inputImagen-${index}`) as HTMLInputElement;

    // if (inputNombreProducto) {
    //   inputNombreProducto.style.display = 'none';
    //   inputImagenText.style.display = 'none';
    //   inputFile.style.display = 'none';
    // } else {
    //   this.obtenerProductosArray.at(index).reset();
    //   this.obtenerProductosArray.at(index).get('nombreProducto')?.enable();
    //   this.obtenerProductosArray.at(index).get('descripcionProducto')?.enable();
    //   this.obtenerProductosArray.at(index).get('costoUnitario')?.enable();
    //   const inputNombreProducto = document.getElementById(`nombreProducto-${index}`) as HTMLInputElement;

    //   if (inputNombreProducto) {
    //     inputNombreProducto.style.display = '';
    //   }
    // }

    
    if (dpProductosExistentes.value) {
      inputNombreProducto.style.display = 'none';
      inputImagenText.style.display = 'none';
      inputFile.style.display = 'none';
    }
  }

  obtenerImagen(index: number, event: any) {
    let tiposImagenPermitidos: string[] = ['image/jpg', 'image/png', 'image/jpeg'];

    const file = event.target.files[0];
    if(file) {
      if (tiposImagenPermitidos.includes(file.type)) {
        this.mostrarImagen[index] = true;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenesString[index] = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.obtenerProductosArray.at(index).get('imagenProducto')?.patchValue('');
        event.target.result = '';
        this.mostrarImagen[index] = false;
        this.imagenesString[index] = '';
      }
    } else {
      this.mostrarImagen[index] = false;
      this.imagenesString[index] = '';
    }
  }

  /* Service */

  agregarRegistroCompras() {
    // console.log(this.comprasService.crearRegistroCompra(this.formularioCompras))
  }

  obtenerProveedores() {
    this.proveedoresService.obtenerProveedores().pipe(
      tap((data: Proveedor[]) => {
        this.proveedores = data;
      })
    ).subscribe({
      error: (e) => console.log(e)
    })
  }

  obtenerMetodoDePago() {
    this.comprasService.obtenerMetodoDePago().pipe(
      tap((data: MetodoPago[]) => {
        this.metodosPago = data;
      })
    ).subscribe({
      error: (e) => console.log(e)
    })
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().pipe(
      tap((data: Categoria[]) => {
        this.categorias = data;
      })
    ).subscribe(
      {
        next: (m) => console.log("La operacion fue exitosa:", m),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    )
  }
}
