import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {path:'home', loadComponent: () => import('./features/components/home/home.component').then(c => c.HomeComponent)},
    {path:'products', loadComponent: () => import('./features/components/products/products.component').then(c => c.ProductsComponent)},
    {path:'cart', loadComponent: () => import('./features/components/cart/cart.component').then(c => c.CartComponent)},
    {path:'categories', loadComponent: () => import('./features/components/categories/categories.component').then(c => c.CategoriesComponent)},
    {path:'brands', loadComponent: () => import('./features/components/brands/brands.component').then(c => c.BrandsComponent)},


    {path:'**', loadComponent: () => import('./shared/components/notfound/notfound.component').then(c => c.NotfoundComponent)},

];
