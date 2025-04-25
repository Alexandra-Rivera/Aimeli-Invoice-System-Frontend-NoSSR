import { Routes } from '@angular/router';

export const formulariosRoutes: Routes = [
    {
        path: 'clientes',
        loadComponent: () => 
            import('./clientes/clientes.component').then(c => c.ClientesComponent),
        title: 'Clientes'
    },
    {
        path: 'categorias',
        loadComponent: () => 
            import('./categorias/categorias.component').then((c) => c.CategoriasComponent),
        title: 'Categorías'
    },
    {
        path: 'destinos',
        loadComponent: () =>
            import('./destinos/destinos.component').then((c) => c.DestinosComponent),
        title: 'Destinos'
    }, 
    {
        path: 'encomendistas',
        loadComponent: () =>
            import('./encomendistas/encomendistas.component').then((c) => c.EncomendistasComponent),
        title: 'Encomendistas'
    },
    {
        path: 'proveedores',
        loadComponent: () =>
            import('./proveedores/proveedores.component').then((c) => c.ProveedoresComponent),
        title: 'Proveedores'
    }
];