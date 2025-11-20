import { Component, Input } from '@angular/core';
import { ProductoInfoCompraproducto } from '../../../../../../shared/interfaces/compraproducto/producto-info-compraproducto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComprasServiceService } from '../../../../../../shared/data-access/compras-service/compras-service.service';
import { CompraInformacion } from '../../../../../../shared/interfaces/compras/compra-informacion';
import { tap } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-registro-de-compras-tabla',
  imports: [CommonModule],
  templateUrl: './registro-de-compras-tabla.component.html',
  styleUrl: './registro-de-compras-tabla.component.css'
})
export class RegistroDeComprasTablaComponent {
  @Input() registros: ProductoInfoCompraproducto[] = [];

  constructor(
    private router: Router,
    private comprasService: ComprasServiceService,
    private toast: HotToastService
  ) {

  }

  navegarVistaRegistroDeCompra(index: number) {
    let registro_compra: CompraInformacion;
    this.comprasService.solicitarItemPorID(index).pipe(
      tap((data: CompraInformacion) => {
        registro_compra = data;
      })
    ).subscribe({
      next: () => {
        this.router.navigate(["/home/compras/registro-compra", registro_compra.compra.id])
      },
      error: (e) => {
        this.toast.error("No se pudo cargar la vista. ");
        console.error(e);
      }
    });
  }
}
