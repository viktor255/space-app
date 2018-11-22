import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule
  ]
})
export class AngularMaterialModule {
}
