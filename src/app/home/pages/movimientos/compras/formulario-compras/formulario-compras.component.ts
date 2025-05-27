import { Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { NavComponentComponent } from '../../../../../components/nav-component/nav-component.component';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
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
import { HotToastService } from '@ngxpert/hot-toast';


@Component({
  selector: 'app-formulario-compras',
  imports: [NavComponentComponent, ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './formulario-compras.component.html',
  styleUrl: './formulario-compras.component.css'
})
export class FormularioComprasComponent {
  isValid: boolean = false;

  mostrarImagen: { [key: number]: boolean } = {};
  imagenesString: { [key: number]: string } = {};
  montoTotal: {[key: number]: number} = {};
  totalCompra: number | null = null;

  imagenes: {[key:number]: File} = {};
  imagenes_array: File[] = [];

  // productoExistenteIndex: number| null = null;
  productosExistentesIndex: { [key:number] : number} = {};
 
  proveedores: Proveedor[] = [];
  metodosPago: MetodoPago[] = [];
  categorias: Categoria[] = [];
  // productosExistentes: ProductoCompleto[] = [];

  productos : { [key: number] : ProductoCompleto[] } = []

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
        nombreProducto: ['', [Validators.required, Validators.maxLength(100)]],
        descripcionProducto: ['', [Validators.required, Validators.maxLength(300)]],
        categoria: ['', Validators.required],
        cantidadProducto: ['', Validators.required],
        costoUnitario: ['', Validators.required],
        precioVenta: ['', Validators.required]
      })
    ]),
  });

  constructor(private toast: HotToastService) { 
    // let esValido = this.formularioCompras.valid;      
  }

  ngOnInit() {
    this.obtenerProveedores();
    this.obtenerMetodoDePago();
    this.obtenerCategorias();
  }
  // Se obtienen todos los productos del array 
  get obtenerProductosArray() {
    // return this.formularioCompras.get('productos') as FormArray;
    return this.formularioCompras.controls['productos'] as FormArray;
  }

  /*Calculos */
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


  /*Guardar Factura */
  guardarFactura() {

    if (this.formularioCompras.valid) {
    /*Se genera la parte de productos */
    let productos: any[] = [];

    for (let i = 0; i < this.obtenerProductosArray.controls.length; i++) {
      if (this.imagenes[i]) {
        this.formarArrayDeImagenes(this.imagenes[i]);
      }
      if (this.productosExistentesIndex[i]) {
        let producto = {
          id: this.productosExistentesIndex[i],
          cantidad: this.obtenerProductosArray.controls[i].get('cantidadProducto')?.value,
        }

        productos.push(producto);
      } else {
        let producto = {
          id: 999999999,
          nombre: this.obtenerProductosArray.controls[i].get('nombreProducto')?.value,
          descripcion: this.obtenerProductosArray.controls[i].get('descripcionProducto')?.value,
          idCategoria: this.obtenerProductosArray.controls[i].get('categoria')?.value,
          cantidad: this.obtenerProductosArray.controls[i].get('cantidadProducto')?.value,
          costoUnitario: this.obtenerProductosArray.controls[i].get('costoUnitario')?.value,
          precioVenta: this.obtenerProductosArray.controls[i].get('precioVenta')?.value
        }

        productos.push(producto); 
      }
    }

        /*Se genera la parte de factura */
    const factura_compras: RegistroCompras  =  {
      "compra": {
        id: 999999999,
        fechaCompra: this.formularioCompras.get('fechaCompra')?.value ?? "",
        numeroFactura: this.formularioCompras.get('numeroFactura')?.value ?? "",
        idMetodoPago: parseInt(this.formularioCompras.get('metodoPago')?.value ?? ""),
        idProveedor: parseInt(this.formularioCompras.get('proveedor')?.value ?? "")
      },
      "productos" : productos
    }
 
    this.agregarRegistroCompras(factura_compras);
    } else {
      this.toast.error("Formulario Inválido.", {
        duration: 3000
      });
    }

  }

  formarArrayDeImagenes(imagen: File) {
    this.imagenes_array.push(imagen);
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
    delete this.imagenes[index]; // si se elimina el producto, entonces la imagen se quita del array.

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


  /*Metodos para gestionar productos existentes */
  obtenerArrayProductosExistentes(index: number): ProductoCompleto[] {
    const categoria_index: number = parseInt(this.obtenerProductosArray.at(index).get("categoria")?.value);


    this.productosService.obtenerProductosSegunIdCategoria(categoria_index).pipe(
      tap((data: ProductoCompleto[]) => {
        this.productos[index] = data;
      })
    ).subscribe({
      next: (response) => console.log("La peticion fue un exito: ", response), 
      error: (e) => console.error(e), 
      complete: () => console.log("Se completó la petición.")
    })
     
    return this.productos[index];
  }

  modificacionesProductoExistente(index: number) {
    /*Ubicando valores del dropdown de productos existentes para acceder al producto seleccionado */
    const dpProductosExistentes = document.getElementById(`productoExistente-${index}`) as HTMLSelectElement;
    const productoSeleccionado = this.productos[index].find((producto) => producto.nombre === dpProductosExistentes?.value);  

    if (productoSeleccionado) {
      this.productosExistentesIndex[index] = productoSeleccionado.id;
      
      this.obtenerProductosArray.at(index).patchValue({
        nombreProducto: productoSeleccionado.nombre,
        descripcionProducto: productoSeleccionado.descripcion,
        costoUnitario: productoSeleccionado.costoUnitario,
        precioVenta: productoSeleccionado.precioVenta
      })

        this.imagenesString[index] = productoSeleccionado?.imagen ?? "";
        this.mostrarImagen[index] = true;
        this.obtenerProductosArray.at(index).get('nombreProducto')?.disable();
        this.obtenerProductosArray.at(index).get('imagenProducto')?.disable();
        this.obtenerProductosArray.at(index).get('descripcionProducto')?.disable();
        this.obtenerProductosArray.at(index).get('costoUnitario')?.disable();
        this.obtenerProductosArray.at(index).get('precioVenta')?.disable();

      
      if (dpProductosExistentes.value) {
        // this.nombreProductoInput.toArray()[index].nativeElement.style.display = 'none';
        this.imagenTextInput.toArray()[index].nativeElement.style.display = 'none';
        this.imagenFileInput.toArray()[index].nativeElement.style.display = 'none';
      }
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
          this.imagenesString[index] = e.target.result; //Se genera un string base64 que representa a la imagen
          this.imagenes[index] = file; // aqui se guarda el archivo de imagen
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
      this.comprasService.crearRegistroCompra(factura_compras, this.imagenes_array).pipe().subscribe(
      {
        next: (m) => {
          console.log(m),
          this.toast.success(m.mensaje, { duration: 3000 })
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (e) => {
            this.toast.error("Ha ocurrido un error en el servidor");
            console.log(e);
        }, 
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
}
