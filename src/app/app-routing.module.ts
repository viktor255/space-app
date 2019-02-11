import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SpacecraftCreateComponent } from './space/spacecrafts/spacecraft-create/spacecraft-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { DashboardComponent } from './space/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'password-reset/:token', component: PasswordResetComponent},
  {path: 'create-spacecraft', component: SpacecraftCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit-spacecraft/:spacecraftId', component: SpacecraftCreateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
