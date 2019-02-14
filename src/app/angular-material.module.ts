import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
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
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule {
}
