import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { ComprasServiceService } from '../../../../../shared/data-access/compras-service/compras-service.service';
import { Categoria } from '../../../../../shared/interfaces/categoria/categoria';
import { tap } from 'rxjs';
import { Proveedor } from '../../../../../shared/interfaces/proveedor/proveedor';
import { MetodoPago } from '../../../../../shared/interfaces/metodopago/metodo-pago';
import { CategoriasServiceService } from '../../../../../shared/data-access/categorias-service/categorias-service.service';
import { ProveedoresServiceService } from '../../../../../shared/data-access/proveedores-service/proveedores-service.service';
import { RegistroCompras } from '../../../../../shared/interfaces/compras/registro-compras';
import { ProductoCompleto } from '../../../../../shared/interfaces/producto/producto-completo';
import { ProductosServiceService } from '../../../../../shared/data-access/productos-service/productos-service.service';

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

  productoExistenteIndex: number| null = null;
 
  proveedores: Proveedor[] = [];
  metodosPago: MetodoPago[] = [];
  categorias: Categoria[] = [];
  productosExistentes: ProductoCompleto[] = [];

  @ViewChildren('nombreProducto') nombreProductoInput!: QueryList<ElementRef>;
  @ViewChildren('imagenTextInput') imagenTextInput!: QueryList<ElementRef>;
  @ViewChildren('imagenFileInput') imagenFileInput!: QueryList<ElementRef>; 

  /*Injections */
  fb = inject(FormBuilder);
  comprasService = inject(ComprasServiceService);
  categoriasService = inject(CategoriasServiceService);
  proveedoresService = inject(ProveedoresServiceService);
  productosService = inject(ProductosServiceService);

  /* Definicion de formulario reactivo */
  formularioCompras = this.fb.group ({
      fechaCompra: ['', Validators.required],
      numeroFactura: ['', Validators.required],
      metodoPago: ['', Validators.required],
      proveedor: ['', Validators.required],


    productos: new FormArray([
      this.fb.group({
        imagenProducto: ['', Validators.required],
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
    let productos: any[] = [];

    for (let i = 0; i < this.obtenerProductosArray.controls.length; i++) {
      if (this.productoExistenteIndex !== null) {
        let producto = {
          id: this.productosExistentes[i].id,
          cantidad: this.obtenerProductosArray.controls[i].get('cantidadProducto')?.value,
        }

        productos.push(producto);
      } else {
        let producto = {
          id: 999999999,
          imagen: this.imagenesString[i],
          nombre: this.obtenerProductosArray.controls[i].get('nombreProducto')?.value,
          descripcion: this.obtenerProductosArray.controls[i].get('descripcionProducto')?.value,
          categoriaDTO: {
            id: this.obtenerProductosArray.controls[i].get('categoria')?.value
          },
          cantidad: this.obtenerProductosArray.controls[i].get('cantidadProducto')?.value,
          costoUnitario: this.obtenerProductosArray.controls[i].get('costoUnitario')?.value,
          precioVenta: this.obtenerProductosArray.controls[i].get('precioVenta')?.value
        }

        console.log("Producto a guardar:", producto);
        console.log("string de imagenes:", this.imagenesString);
        productos.push(producto); 
      }
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

    this.agregarRegistroCompras(factura_compras);
  }

  agregarProducto() {
    if(this.categorias) {
      this.calcularTotalCompra();
      this.obtenerProductosArray.push(
        this.fb.group({
        imagenProducto: ['', Validators.required],
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


  /*Otros metodos */
  obtenerArrayProductosExistentes(index: number): ProductoCompleto[] {
    const categoria_index: number = parseInt(this.obtenerProductosArray.at(index).get("categoria")?.value);
    this.limpiarInputsProducto(index);


    this.productosService.obtenerProductosSegunIdCategoria(categoria_index).pipe(
      tap((data: ProductoCompleto[]) => {
        this.productosExistentes = data;
        console.log("Data: ", data);
      })
    ).subscribe({
      next: (response) => console.log("La peticion fue un exito: ", response), 
      error: (e) => console.error(e), 
      complete: () => console.log("Se completó la petición.")
    })
     
    // const categoria = this.categorias.find((categoria) => categoria.id === categoria_index);
    return this.productosExistentes;
  }

  modificacionesProductoExistente(index: number) {
    //El index ingresado como parametro representa el item donde se van a efectuar las siguientes modificaciones: 

    /*Ubicando valores del dropdown de productos existentes para acceder al producto seleccionado */
    const dpProductosExistentes = document.getElementById(`productoExistente-${index}`) as HTMLSelectElement;
    const productoSeleccionado = this.productosExistentes.find((producto) => producto.nombre === dpProductosExistentes?.value);  

    if (productoSeleccionado) {
      this.productoExistenteIndex = productoSeleccionado.id;

      this.obtenerProductosArray.at(index).patchValue({
        nombreProducto: productoSeleccionado.nombre,
        descripcionProducto: productoSeleccionado.descripcion,
        costoUnitario: productoSeleccionado.costoUnitario,
        precioVenta: productoSeleccionado.precioVenta
      })

        this.imagenesString[index] = productoSeleccionado?.imagen ?? "";
        this.mostrarImagen[index] = true;
        this.obtenerProductosArray.at(index).get('imagenProducto')?.disable();
        this.obtenerProductosArray.at(index).get('descripcionProducto')?.disable();
        this.obtenerProductosArray.at(index).get('costoUnitario')?.disable();
        this.obtenerProductosArray.at(index).get('precioVenta')?.disable();

      
      if (dpProductosExistentes.value) {
        this.nombreProductoInput.toArray()[index].nativeElement.style.display = 'none';
        this.imagenTextInput.toArray()[index].nativeElement.style.display = 'none';
        this.imagenFileInput.toArray()[index].nativeElement.style.display = 'none';
      }
    } 
  }

  limpiarInputsProducto(index: number) {
      this.obtenerProductosArray.at(index).patchValue({
        nombreProducto: "",
        descripcionProducto: "",
        costoUnitario: "",
        precioVenta: ""
      });

      this.mostrarImagen[index] = false;
      this.imagenesString[index] = '';

      this.obtenerProductosArray.at(index).get('imagenProducto')?.enable();
      this.obtenerProductosArray.at(index).get('descripcionProducto')?.enable();
      this.obtenerProductosArray.at(index).get('costoUnitario')?.enable();
      this.obtenerProductosArray.at(index).get('precioVenta')?.enable();

      this.nombreProductoInput.toArray()[index].nativeElement.style.display = 'block';
      this.imagenTextInput.toArray()[index].nativeElement.style.display = 'block';
      this.imagenFileInput.toArray()[index].nativeElement.style.display = 'block';

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

  agregarRegistroCompras(factura_compras: RegistroCompras) {
      this.comprasService.crearRegistroCompra(factura_compras).pipe().subscribe(
      {
        next: (m) => console.log("El registro fue agregado exitosamente: ", m),
        error: (e) => console.error(e), 
        complete: () => console.log("El registro de factura fue agregado exitosamente. Completado.")
      }
    );
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

  subirImagen(file: any, index: number) {
    // this.cloudinaryService.publicarImagen(file).pipe().subscribe({
    //   next: (response: any) => {
    //   // this.imagenesString[index] = response.secure_url;
    //       console.log("link de imagen:", this.imagenesString[index]);
    //     },
    //     error: (e) => console.error(e),
    //     complete: () => console.log("Completado.")
    //     });

  }
}
