import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule
  ]
})
export class AuthModule {
}
