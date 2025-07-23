import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/Auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'auth' , pathMatch:'full'},
    {path:'auth',loadComponent:() =>import('./core/auth/auth.component').then(m => m.AuthComponent), title:'Login Page'},
    {path:'dashboard',loadComponent:() =>import('./core/dashboard/dashboard.component').then(m => m.DashboardComponent), title:'Home Page',canActivate:[AuthGuard] ,children:[
        {path:'',redirectTo:'seafarerList',pathMatch:'full'},
        {path:'addNew',loadComponent:()=> import('./Features/pages/add-new/add-new.component').then(m => m.AddNewComponent),title:'Add New'},
        {path:'edit/:id',loadComponent:()=> import('./Features/pages/add-new/add-new.component').then(m => m.AddNewComponent),title:'Edit User'},
        {path:'seafarerList',loadComponent:()=> import('./Features/pages/seafarer-list/seafarer-list.component').then(m => m.SeafarerListComponent),title:'Seafarer List'},
        {path:'**',loadComponent:()=>import('./Features/pages/not-found/not-found.component').then(m=>m.NotFoundComponent)}
    ]},
];
