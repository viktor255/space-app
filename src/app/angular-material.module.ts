import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule,
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
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule {
}
