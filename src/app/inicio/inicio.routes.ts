import { Routes} from '@angular/router';

export const InicioRoutes: Routes = [
    {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'registro',
        title: 'Registro',    
        loadComponent: ()=> import('./pages/registro/registro.component').then(c => c.RegistroComponent),      
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: ()=> import ('./pages/login/login.component').then(c => c.LoginComponent),
    }
];
