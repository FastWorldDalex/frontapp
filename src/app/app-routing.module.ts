import { ValidarTokenGuard } from './modules/guards/validar-token.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'auth',
    loadChildren: ()=>import('./modules/auth/auth.module').then(a=> a.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./modules/protected/protected.module').then(p=>p.ProtectedModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
