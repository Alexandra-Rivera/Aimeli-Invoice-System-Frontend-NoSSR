import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class VistaRegistroComprasComponent {
  proveedores: Proveedor[] = [];
  categorias: Categoria[] = [];
  metodosPago: MetodoPago[] = [];
  productos: Producto[] = [];

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

  registro_id: number = 0;

  actualizarFacturaFormulario!: FormGroup;

  constructor(
    fb: FormBuilder,
    private comprasService: ComprasServiceService,
    private proveedoresService: ProveedoresServiceService,
    private categoriasService: CategoriasServiceService,
    private metodoPagoService: MetodopagoService,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {
    this.actualizarFacturaFormulario = fb.group({
      fechaCompra: ['', Validators.required],
      numeroFactura: ['', Validators.required],
      metodoPago: ['', Validators.required],
      proveedor: ['', Validators.required],
      productos: new FormArray([
        fb.group({
          imagenProducto: ['', Validators.required],
          nombreProducto: ['', [Validators.required, Validators.maxLength(100)]],
          descripcionProducto: ['', [Validators.required, Validators.maxLength(300)]],
          categoria: ['', Validators.required],
          cantidadProducto: ['', Validators.required],
          costoUnitario: ['', Validators.required],
          precioVenta: ['', Validators.required]
        })
      ]),
    })
  }

  ngOnInit() {
    /*Obteniendo ID del registro a traves de los parametros del url */
    this.route.paramMap.subscribe(params => {
      this.registro_id = Number(params.get('id'));
      if (this.registro_id) {
        this.obtenerDatosRegistroPorId(this.registro_id);
      }
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

  actualizarFactura() {

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

        this.actualizarFacturaFormulario.controls['productos'].patchValue(this.productos);
      }
    )).subscribe({
        next: (r) => {
        console.log(r);
      },
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
