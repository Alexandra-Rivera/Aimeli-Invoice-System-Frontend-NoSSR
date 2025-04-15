import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './home/pages/formularios/clientes/clientes.component';
import { ProveedoresComponent } from './home/pages/formularios/proveedores/proveedores.component';
import { CategoriasComponent } from './home/pages/formularios/categorias/categorias.component';
import { EncomendistasComponent } from './home/pages/formularios/encomendistas/encomendistas.component';
import { DestinosComponent } from './home/pages/formularios/destinos/destinos.component';
import { InventarioComponent } from './home/pages/inventario/inventario.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'clientes',
        component: ClientesComponent,
        title: 'Clientes'
    },
    {
        path: 'proveedores',
        component: ProveedoresComponent,
        title: 'Proveedores'
    },
    {
        path: 'categorias',
        component: CategoriasComponent,
        title: 'Categorías'
    },
    {
        path: 'encomendistas',
        component: EncomendistasComponent,
        title: 'Encomendistas'
    },
    {
        path: 'destinos',
        component: DestinosComponent,
        title: 'Destinos'
    },
    {
        path: 'inventario',
        component: InventarioComponent,
        title: 'Inventario'
    }
];
