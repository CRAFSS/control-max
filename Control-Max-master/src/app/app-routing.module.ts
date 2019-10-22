import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]},
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' , canActivate: [AuthGuard]},
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' , canActivate: [AuthGuard]},
  { path: 'novogasto', loadChildren: './novogasto/novogasto.module#NovogastoPageModule' , canActivate: [AuthGuard]},
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' , canActivate: [AuthGuard]},
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' , canActivate: [AuthGuard]},
  { path: 'ajustes', loadChildren: './ajustes/ajustes.module#AjustesPageModule' , canActivate: [AuthGuard]},
  { path: 'historico', loadChildren: './historico/historico.module#HistoricoPageModule', canActivate: [AuthGuard]},
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'conta', loadChildren: './conta/conta.module#ContaPageModule', canActivate: [AuthGuard] },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
