import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./home.component').then(c => c.HomeComponent),
    },
    {
        path: 'inventario',
        loadComponent: () =>
            import('./pages/inventario/inventario.component').then((c) => c.InventarioComponent),
        title: 'Inventario'
    },
    {
        path: 'ventas',
        loadChildren: () => 
            import('./pages/movimientos/ventas/ventas.routes').then((c) => c.ventasRoutes),
    },
    {
        path: 'compras',
        loadChildren: () =>
            import('./pages/movimientos/compras/compras.routes').then((c) => c.comprasRoutes),
    },
    {
        path: 'formularios',
        loadChildren: () =>
            import('./pages/formularios/formularios.routes').then((c) => c.formulariosRoutes)
    }
];