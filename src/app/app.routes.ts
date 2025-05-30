import { Routes } from '@angular/router';
import { FormularioInfoAmeliComponent } from './formulario-info-ameli/formulario-info-ameli.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'inicio',
        title: 'Inicio',
        loadChildren: () => import('./inicio/inicio.routes').then(m => m.InicioRoutes)
    },
    {
        path: 'home',
        title: 'Home',
        loadChildren: () => import('../app/home/home.routes').then((m) => m.homeRoutes),
        canActivate: [AuthGuard]
    },
    {
        path: 'formulario-info-aimeli',
        component: FormularioInfoAmeliComponent,
        title: 'Formulario de Informacion de Aimeli'
    },
    {
        path: '', 
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/home'
    }
];
