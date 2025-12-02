import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { NavComponentComponent } from '../../../../../../components/nav-component/nav-component.component';
import { CompraInformacion } from '../../../../../../shared/interfaces/compras/compra-informacion';
import { ComprasServiceService } from '../../../../../../shared/data-access/compras-service/compras-service.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { tap } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresServiceService } from '../../../../../../shared/data-access/proveedores-service/proveedores-service.service';
import { CategoriasServiceService } from '../../../../../../shared/data-access/categorias-service/categorias-service.service';
import { MetodopagoService } from '../../../../../../shared/data-access/metodopago-service/metodopago.service';
import { Proveedor } from '../../../../../../shared/interfaces/proveedor/proveedor';
import { Categoria } from '../../../../../../shared/interfaces/categoria/categoria';
import { MetodoPago } from '../../../../../../shared/interfaces/metodopago/metodo-pago';
import { Producto } from '../../../../../../shared/interfaces/producto/producto';

@Component({
  selector: 'app-vista-registro-compras',
  imports: [CommonModule, NavComponentComponent, ReactiveFormsModule],
  templateUrl: './vista-registro-compras.component.html',
  styleUrl: './vista-registro-compras.component.css'
})
export class VistaRegistroComprasComponent implements OnInit {
  proveedores: Proveedor[] = [];
  categorias: Categoria[] = [];
  metodosPago: MetodoPago[] = [];
  productos: Producto[] = [];

  // Arreglo para Files y Strings de las imagenes a editar
  imagenesFiles: File[] = [];
  imagen:{[key: number]: String} = {};

  registro_compra: CompraInformacion = {
    compra: {
      id: 1,
      fechaCompra: "string",
      numeroFactura: "string",
      idMetodoPago: 1,
      metodoPago: "string",
      idProveedor: 1,
      proveedor: "string"
    },
    productos: []
  };

  registroId: number = 0;

  actualizarFacturaFormulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comprasService: ComprasServiceService,
    private proveedoresService: ProveedoresServiceService,
    private categoriasService: CategoriasServiceService,
    private metodoPagoService: MetodopagoService,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}

  ngOnInit() {

    /*Obteniendo ID del registro a traves de los parametros del url */
    this.route.paramMap.subscribe(params => {
      this.registroId = Number(params.get('id'));
      if (this.registroId) {
        this.obtenerDatosRegistroPorId(this.registroId);
      }
    })

    this.actualizarFacturaFormulario = this.fb.group({
      fechaCompra: ['', Validators.required],
      numeroFactura: ['', Validators.required],
      metodoPago: ['', Validators.required],
      proveedor: ['', Validators.required],
      productos: this.fb.array([]),
    })

    /*Obteniendo proveedores */
    this.obtenerProveedores();

    /*Obteniendo categorias */
    this.obtenerCategorias();

    /*Obteniendo metodos de pago */
    this.obtenerMetodosPago();
  }

  /*Getter de productos */
  get obtenerProductosArray(): FormArray {
    return this.actualizarFacturaFormulario.get('productos') as FormArray;
  }

  crearProducto(producto: Producto): FormGroup {
    return this.fb.group({
      imagen: ["", [Validators.required]],
      nombre: [producto.nombre, [Validators.required, Validators.maxLength(100)]],
      descripcion: [producto.descripcion, [Validators.required, Validators.maxLength(300)]],
      categoria: [producto.idCategoria, Validators.required],
      cantidad: [producto.cantidad, Validators.required],
      costoUnitario: [producto.costoUnitario, Validators.required],
      precioVenta: [producto.precioVenta, Validators.required]
    })
  }

  /*Obteniendo el valor total por producto*/
  obteniendoTotalporProducto() {

  }

  obtenerImagen(event: any, index: number) {
    let tiposImagenPermitidos: string[] = ['image/jpg', 'image/png', 'image/jpeg'];

    const file = event.target.files[0];
    if(file) {
      if (tiposImagenPermitidos.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagen[index] = e.target.result; //Se genera un string base64 que representa a la imagen
          this.imagenesFiles = file; // aqui se guarda el archivo de imagen
        };
        reader.readAsDataURL(file);
      } else {
        event.target.result = '';
        }
      }
   }

  /* Services */
  obtenerDatosRegistroPorId(registro_id: number) {
    this.comprasService.solicitarItemPorID(registro_id).pipe(
      tap((data: CompraInformacion) => {
        this.registro_compra = data;
        this.productos = this.registro_compra.productos;

        /*Asignándole los valores del objeto al formulario de registro */
        this.actualizarFacturaFormulario.patchValue({
            fechaCompra: this.registro_compra.compra.fechaCompra,
            numeroFactura: this.registro_compra.compra.numeroFactura,
            metodoPago: this.registro_compra.compra.idMetodoPago,
            proveedor: this.registro_compra.compra.idProveedor,
        });

        const productosArray = this.obtenerProductosArray;
        productosArray.clear();

        this.productos.forEach(producto => {
          productosArray.push(this.crearProducto(producto));
        })

        for (let i = 0; i <= productosArray.length; i++) {
          this.imagen[i] = this.productos[i].imagen;
        }
      }
    )).subscribe({
      error: (e) => {
        console.error(e);
        this.toast.error("Algo salio mal.");
      }
  })
}

  obtenerProveedores() {
    this.proveedoresService.obtenerProveedores().pipe(
      tap((data: Proveedor[]) => {
        this.proveedores = data;
      })
    ).subscribe({
      error: (e) => {
        console.error(e);
        this.toast.error("Algo salio mal con los proveedores.");
      }
    })
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().pipe(
      tap((data: Categoria[]) => {
        this.categorias = data;
      })
    ).subscribe({
      error: (e) => {
        console.error(e);
        this.toast.error("Algo salio mal con las categorias.")
      }
    })
  }

  obtenerMetodosPago() {
    this.metodoPagoService.obtenerMetodoDePago().pipe(
      tap((data: MetodoPago[]) => {
        this.metodosPago = data;
      })
    ).subscribe({
      error: (e) => {
        console.error(e);
        this.toast.error("Algo salio mal con los metodos de pago. ");
      }
    })
  }
}
