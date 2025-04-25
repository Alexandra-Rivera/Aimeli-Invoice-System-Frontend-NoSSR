import { Routes } from '@angular/router';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';
import { FormularioInfoAmeliComponent } from './formulario-info-ameli/formulario-info-ameli.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
    },
    {
        path: 'formulario-registro',
        component: FormularioRegistroComponent,
        title: 'Formulario de Registro'
    },
    {
        path: 'formulario-info-aimeli',
        component: FormularioInfoAmeliComponent,
        title: 'Formulario de Informacion de Aimeli'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    }
];
