import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'vessels',
        loadComponent: () => import('./components/vessels/vessels').then(m => m.Vessels),
    },
    {
        path: 'emissions',
        loadComponent: () => import('./components/emissions/emissions').then(m => m.Emissions),
    },
    {
        path: '',
        redirectTo: 'vessels',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () => import('./components/error-404/error-404').then(m => m.Error404),
    }
];
