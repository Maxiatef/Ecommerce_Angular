import { Routes } from '@angular/router';
import path from 'path/win32';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {path:'home', loadComponent: () => import('./features/components/home/home.component').then(c => c.HomeComponent)},
    {path:'products', loadComponent: () => import('./features/components/products/products.component').then(c => c.ProductsComponent)},
    {path:'cart', loadComponent: () => import('./features/components/cart/cart.component').then(c => c.CartComponent)},
    {path:'categories', loadComponent: () => import('./features/components/categories/categories.component').then(c => c.CategoriesComponent)},
    {path:'brands', loadComponent: () => import('./features/components/brands/brands.component').then(c => c.BrandsComponent)},
    {path:'login', loadComponent: () => import('./core/auth/login/login/login.component').then(c => c.LoginComponent)},
    {path:'register', loadComponent: () => import('./core/auth/register/register.component').then(c => c.RegisterComponent)},
    {path:'specificproduct/:id', loadComponent: () => import('./shared/components/specificproduct/specificproduct.component').then(c => c.SpecificproductComponent)},
    {path:'specificcategory/:id', loadComponent: () => import('./features/components/specificcategory/specificcategory.component').then(c => c.SpecificcategoryComponent)},
    {path:'specificbrand/:id', loadComponent: () => import('./features/components/specificbrand/specificbrand.component').then(c => c.SpecificbrandComponent)},
    {path:'checkout', loadComponent: () => import('./features/components/checkout/checkout.component').then(c => c.CheckoutComponent)},



    
    {path:'**', loadComponent: () => import('./shared/components/notfound/notfound.component').then(c => c.NotfoundComponent)},

];
