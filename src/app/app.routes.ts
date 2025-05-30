import { Routes } from '@angular/router';
import { FormularioInfoAmeliComponent } from './formulario-info-ameli/formulario-info-ameli.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
    },
    {
        path: 'inicio',
        title: 'Inicio',
        loadChildren: () => import('./inicio/inicio.routes').then(m => m.InicioRoutes)
    },
    {
        path: 'formulario-info-aimeli',
        component: FormularioInfoAmeliComponent,
        title: 'Formulario de Informacion de Aimeli'
    },
];
