import { Routes } from '@angular/router';

export const ventasRoutes: Routes = [
    {
        path: 'listado-productos',
        loadComponent: () => 
            import('./listado-productos/listado-productos.component').then(c => c.ListadoProductosComponent),
        title: 'Productos'
    },
    {
        path: 'estado-de-pedidos',
        loadComponent: () => 
            import('./estado-de-pedidos/estado-de-pedidos.component').then((c) => c.EstadoDePedidosComponent),
        title: 'Estado de pedidos'
    },
    {
        path: 'formulario-ventas',
        loadComponent: () =>
            import('./formulario-ventas/formulario-ventas.component').then((c) => c.FormularioVentasComponent),
        title: 'Formulario de Ventas'
    },
    {
        path: 'historial-ventas',
        loadComponent: () => 
            import('./historial-ventas/historial-ventas.component').then((c) => c.HistorialVentasComponent),
        title: 'Registro de ventas'
    }
];