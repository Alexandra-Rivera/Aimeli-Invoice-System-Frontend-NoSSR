import { Routes } from '@angular/router';
import { inventarioRoutes } from './pages/inventario/inventario.routes';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./home.component').then(c => c.HomeComponent),
    },
    {
        path: 'inventario',
        loadChildren: () =>
            import('./pages/inventario/inventario.routes').then((c) => inventarioRoutes),
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
    },{
        path: 'reportes',
        loadComponent: () =>
            import('./pages/reportes/reportes.component').then((c) => c.ReportesComponent),
        title: 'Reportes'
    }
];