import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignComponent } from './sign/sign.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [

    ]
  },
  {
    path: 'sign',
    component: SignComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true
  })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
