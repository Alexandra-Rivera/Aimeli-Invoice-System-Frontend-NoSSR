import { Component, inject } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";
import { ProductoCompleto } from '../../../../../shared/interfaces/producto/producto-completo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosServiceService } from '../../../../../shared/data-access/productos-service/productos-service.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../../../shared/interfaces/categoria/categoria';
import { CategoriasServiceService } from '../../../../../shared/data-access/categorias-service/categorias-service.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Proveedor } from '../../../../../shared/interfaces/proveedor/proveedor';
import { ProveedoresServiceService } from '../../../../../shared/data-access/proveedores-service/proveedores-service.service';

@Component({
  selector: 'app-editar-producto',
  imports: [NavComponentComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
  producto!: ProductoCompleto;
  productoId: number = 0;
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];
  imagenString!: string;
  imagenFile!: File;


  /* */
  formularioActualizarProducto!: FormGroup;

  /*Inyecciones */
  formBuilder = inject(FormBuilder);
  categoriasService = inject(CategoriasServiceService);
  productosService = inject(ProductosServiceService);
  proveedoresService = inject(ProveedoresServiceService);

  constructor(private route: ActivatedRoute, private router: Router, private toast: HotToastService) {
      this.formularioActualizarProducto = this.formBuilder.group({
        image: [''],
        nombre: ['', [Validators.maxLength(100)]], 
        descripcion: ['', [Validators.maxLength(300)]],
        cantidad: ['', [Validators.min(0)]],
        precioVenta: ['', [Validators.min(0.0)]], 
        costoUnitario: ['', [Validators.min(0.0)]],
        idCategoria: [''], 
        idProveedor: ['']
      })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productoId = Number(params.get('id'));
      if (this.productoId) {
        this.obtenerDatosDeProducto(this.productoId);
      }
    })

    this.obtenerCategorias();
    this.obtenerProveedores();
  }

  obtenerImagen(event: any) {
        let tiposImagenPermitidos: string[] = ['image/jpg', 'image/png', 'image/jpeg'];

    const file = event.target.files[0];
    if(file) {
      if (tiposImagenPermitidos.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenString = e.target.result; //Se genera un string base64 que representa a la imagen
          this.imagenFile = file; // aqui se guarda el archivo de imagen
        };
        reader.readAsDataURL(file);
      } else {
        event.target.result = '';
        this.imagenString = '';
      }
    } else {
      this.imagenString = '';
    }
  }

  cancelarCambios() {
    window.location.reload();
  }

  guardarCambios() {

    if(this.formularioActualizarProducto.valid) {
      const data = {
            id: this.producto.id,
            codigo: this.producto.codigo, 
            imagenURL: this.producto.imagen,
            nombre: this.formularioActualizarProducto.controls['nombre'].value, 
            descripcion: this.formularioActualizarProducto.controls['descripcion'].value,
            cantidad: this.formularioActualizarProducto.controls['cantidad'].value,
            precioVenta: this.formularioActualizarProducto.controls['precioVenta'].value, 
            costoUnitario: this.formularioActualizarProducto.controls['costoUnitario'].value,
            idCategoria: this.formularioActualizarProducto.controls['idCategoria'].value, 
            idProveedor: this.formularioActualizarProducto.controls['idProveedor'].value
      }
      this.actualizarProducto(data, this.imagenFile);
    } else {
      this.toast.error("Formulario Inválido.");
    }


  }

  /*Consultas a servicios */
  obtenerDatosDeProducto(id: number) {
    this.productosService.obtenerProductoSegunId(id).pipe(
      tap((data: ProductoCompleto) => {
        this.producto = data;
        this.formularioActualizarProducto.patchValue({
            nombre: this.producto.nombre, 
            descripcion: this.producto.descripcion, 
            cantidad: this.producto.cantidad, 
            precioVenta: this.producto.precioVenta, 
            costoUnitario: this.producto.costoUnitario,
            idCategoria: this.producto.idCategoria,
            idProveedor: this.producto.idProveedor
        })  
      })
    ).subscribe({
      next: (m) => console.log(m), 
      error: (e) => console.log(e), 
    });
  }

  obtenerCategorias() {
    this.categoriasService.obtenerCategorias().pipe(
      tap((data: Categoria[]) => {
        this.categorias = data;
      })
    ).subscribe({
      next: (m) => {
        console.log(m)
      },
      error: (e) => console.log(e),
      complete: () => console.log("Completado.")
    });
  }

  obtenerProveedores() {
    this.proveedoresService.obtenerProveedores().pipe(
      tap((data: Proveedor[]) => {
        this.proveedores = data
      })
    ).subscribe({
      next: (m) => {
        console.log(m);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  actualizarProducto(producto: any, imagen: File) {
    this.productosService.actualizarInformacionProducto(producto, imagen).pipe().subscribe({
      next: (m) => {
        console.log(m);
        this.toast.success("¡El producto ha sido actualizado con éxito!");
        setTimeout(() => {
          this.router.navigate(['inventario']);
        }, 3000);
      }, 
      error: (e) => {
        console.error(e);
        this.toast.error("Ocurrio un error!");
      }
    });
  }
}
