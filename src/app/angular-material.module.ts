import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatFormFieldModule
  ]
})
export class AngularMaterialModule {
}
