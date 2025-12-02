import { Routes } from '@angular/router';

export const comprasRoutes: Routes = [
    {
        path: 'historial-compras',
        loadComponent: () => 
            import('./registro-compras/registro-compras.component').then(c => c.RegistroComprasComponent),
        title: 'Compras'
    },
    {
        path: 'formulario-compras',
        loadComponent: () => 
            import('./formulario-compras/formulario-compras.component').then((c) => c.FormularioComprasComponent),
        title: 'Formulario de Compras'
    },
    {
        path: 'registro-compra/:id',
        loadComponent: () => 
            import('./components/vista-registro-compras/vista-registro-compras.component').then((c) => c.VistaRegistroComprasComponent),
        title: 'Registro de Compra'
    }
];