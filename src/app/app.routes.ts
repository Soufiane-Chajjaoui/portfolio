import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'portfolio',
        loadComponent: () => import('./features/portfolio/portfolio-list.component').then(m => m.PortfolioListComponent)
    },
    {
        path: 'portfolio/:slug',
        loadComponent: () => import('./features/portfolio/project-detail.component').then(m => m.ProjectDetailComponent)
    },
    {
        path: 'blog',
        loadComponent: () => import('./features/blog/blog-list.component').then(m => m.BlogListComponent)
    },
    {
        path: 'blog/:slug',
        loadComponent: () => import('./features/blog/blog-detail.component').then(m => m.BlogDetailComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
