import { NgModule } from '@angular/core';
import { SpacecraftComponent } from './spacecrafts/spacecraft.component';
import { SpacecraftCreateComponent } from './spacecrafts/spacecraft-create.component';
import { SpacecraftListComponent } from './spacecrafts/spacecraft-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SpacecraftEffects } from './spacecrafts/spacecraft.effects';
import { StoreModule } from '@ngrx/store';
import { AngularMaterialModule } from '../angular-material.module';
import { spacecraftReducer } from './reducers/spacecrafts.reducers';

@NgModule({
  declarations: [
    SpacecraftComponent,
    SpacecraftCreateComponent,
    SpacecraftListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    StoreModule.forFeature('spacecrafts', spacecraftReducer),
    EffectsModule.forFeature([SpacecraftEffects]),
  ],
  exports: [
    SpacecraftListComponent,
    SpacecraftCreateComponent
  ]
})
export class SpaceModule {}
