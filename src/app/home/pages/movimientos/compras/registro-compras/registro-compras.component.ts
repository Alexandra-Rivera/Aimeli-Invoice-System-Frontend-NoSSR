import { Component } from '@angular/core';
import { NavComponentComponent } from "../../../../../components/nav-component/nav-component.component";
import { RegistroDeComprasTablaComponent } from "../components/registro-de-compras-tabla/registro-de-compras-tabla.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComprasServiceService } from '../../../../../shared/data-access/compras-service/compras-service.service';
import { RegistroCompraproducto } from '../../../../../shared/interfaces/compraproducto/registro-compraproducto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { ProductoInfoCompraproducto } from '../../../../../shared/interfaces/compraproducto/producto-info-compraproducto';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormatearFechaService } from '../../../../../shared/utils/formatear-fecha.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-compras',
  imports: [NavComponentComponent, RegistroDeComprasTablaComponent, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './registro-compras.component.html',
  styleUrl: './registro-compras.component.css',
  providers: [ComprasServiceService],
})
export class RegistroComprasComponent {

  protected compraProductosFormulario!: FormGroup;
  protected registros: ProductoInfoCompraproducto[] = [];

  constructor(
    fb: FormBuilder,
    private comprasService: ComprasServiceService,
    private toast: HotToastService,
    private utils: FormatearFechaService
  ) {
    this.compraProductosFormulario = fb.group({
      fechaDesde: [''],
      fechaHasta: ['']
    })
   }

  handleClick() {
    this.obtenerRegistrosCompras();
  }

  obtenerRegistrosCompras() {
    const fechaDesde = this.compraProductosFormulario.controls['fechaDesde'].value;
    const fechaHasta = this.compraProductosFormulario.controls['fechaHasta'].value;

    this.comprasService.obtenerRegistrosCompraSegunFecha(fechaDesde, fechaHasta).pipe(
      tap((data: RegistroCompraproducto) => {
        this.registros = data.content.map(item => ({
          idCompra: item.idCompra,
          numeroFactura: item.numeroFactura,
          fechaCompra: this.utils.formatearFecha(item.fechaCompra),
          proveedor: item.proveedor,
          productos: item.productos,
          metodoPago: item.metodoPago,
          total: item.total
        }))
      })
    ).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (e) => {
        console.error(e);
        this.toast.error("Algo salio mal!")
      }
    })
  }
}

