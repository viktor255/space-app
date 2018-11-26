import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SpacecraftListComponent } from './space/spacecrafts/spacecraft-list/spacecraft-list.component';
import { SpacecraftCreateComponent } from './space/spacecrafts/spacecraft-create/spacecraft-create.component';

const routes: Routes = [
  {path: '', component: SpacecraftListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-spacecraft', component: SpacecraftCreateComponent},
  {path: 'edit-spacecraft/:spacecraftId', component: SpacecraftCreateComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
