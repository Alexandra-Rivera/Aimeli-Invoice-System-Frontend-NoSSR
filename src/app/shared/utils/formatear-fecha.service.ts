import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class FormatearFechaService {

  constructor(private toast: HotToastService) { }
  formatearFecha(fecha_array: number[]): string {
    console.log("Corroborando la funcion");
    if (!fecha_array || fecha_array.length !== 3) {
      this.toast.error("Ha ocurrido un error: Ver consola");
      console.error("El array de fecha no es valido.");
    }
  
    const [anio, mes, dia] = fecha_array;
  
    const diaFormateado = String(dia).padStart(2, '0');
    const mesFormateado = String(mes).padStart(2, '0');
  
    return `${diaFormateado}/${mesFormateado}/${anio}`;
  }
  
}
