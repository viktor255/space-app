import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SpacecraftCreateComponent } from './space/spacecrafts/spacecraft-create/spacecraft-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { DashboardComponent } from './space/dashboard/dashboard.component';
import { CosmonautCreateComponent } from './space/cosmonauts/cosmonaut-create/cosmonaut-create.component';
import { SpaceflightCreateComponent } from './space/spaceflights/spaceflight-create/spaceflight-create.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'password-reset/:token', component: PasswordResetComponent},
  {path: 'create-spacecraft', component: SpacecraftCreateComponent, canActivate: [AuthGuard]},
  {path: 'create-cosmonaut', component: CosmonautCreateComponent, canActivate: [AuthGuard]},
  {path: 'create-spaceflight', component: SpaceflightCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit-spacecraft/:spacecraftId', component: SpacecraftCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit-spaceflight/:spaceflightId', component: SpaceflightCreateComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'edit-cosmonaut/:cosmonautId', component: CosmonautCreateComponent, canActivate: [AuthGuard]}
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
