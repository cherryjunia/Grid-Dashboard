import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { map } from 'rxjs/operators'

const redirectUnauthorizedTologin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfine = () =>
  map(user => user ? ['profile', (user as any).uid]: true);

const onlyAllowSelf = next =>
    map(
      user => (!!user && next.params.id == (user as any).uid || [''])
    );

const routes: Routes = [
  {
    path:'', component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data : {authGuardPipe: redirectLoggedInToProfine}
  },
  {
    path:'profile/:id', component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data : {authGuardPipe: onlyAllowSelf}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
