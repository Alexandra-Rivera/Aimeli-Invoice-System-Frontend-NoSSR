import { Routes } from '@angular/router';

export const inventarioRoutes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./inventario.component').then(c => c.InventarioComponent),
        title: 'Inventario'
    },
    {
        path: 'editar-producto/:id',
        loadComponent: () => 
            import('./pages/editar-producto/editar-producto.component').then((c) => c.EditarProductoComponent),
        title: 'Editar producto'
    }
];