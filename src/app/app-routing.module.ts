import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { appRoutes } from './library/utility/app-routes';
import { authGuard } from './library/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: appRoutes.signin,
    loadChildren: () =>
      import('./pages/user/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: appRoutes.signup,
    loadChildren: () =>
      import('./pages/user/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: appRoutes.forgotPassword,
    loadChildren: () =>
      import('./pages/user/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: appRoutes.crypto,
    loadChildren: () =>
      import('./pages/crypto-price/crypto-price.module').then(
        (m) => m.CryptoPriceModule
      ),
    canActivate: [authGuard],
  },
  {
    path: appRoutes.editor + '1',
    loadChildren: () =>
      import('./pages/editor-myself/editor.module').then((m) => m.EditorModule),
    canActivate: [authGuard],
  },
  {
    path: appRoutes.editor,
    loadChildren: () =>
      import('./pages/editor/fabric-editor.module').then(
        (m) => m.FabricEditorModule
      ),
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
