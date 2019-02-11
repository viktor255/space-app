import { NgModule } from '@angular/core';
import { SpacecraftComponent } from './spacecrafts/spacecraft/spacecraft.component';
import { SpacecraftCreateComponent } from './spacecrafts/spacecraft-create/spacecraft-create.component';
import { SpacecraftListComponent } from './spacecrafts/spacecraft-list/spacecraft-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SpacecraftEffects } from './spacecrafts/spacecraft.effects';
import { StoreModule } from '@ngrx/store';
import { AngularMaterialModule } from '../angular-material.module';
import { spacecraftReducer } from './reducers/spacecrafts.reducer';
import { AppRoutingModule } from '../app-routing.module';
import { CosmonautComponent } from './cosmonauts/cosmonaut/cosmonaut.component';
import { CosmonautListComponent } from './cosmonauts/cosmonaut-list/cosmonaut-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { cosmonautReducer } from './reducers/cosmonauts.reducer';
import { CosmonautEffects } from './cosmonauts/cosmonaut.effects';

@NgModule({
  declarations: [
    SpacecraftComponent,
    SpacecraftCreateComponent,
    SpacecraftListComponent,
    CosmonautComponent,
    CosmonautListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    StoreModule.forFeature('spacecrafts', spacecraftReducer),
    StoreModule.forFeature('cosmonauts', cosmonautReducer),
    EffectsModule.forFeature([SpacecraftEffects]),
    EffectsModule.forFeature([CosmonautEffects]),
  ],
  exports: [
    SpacecraftListComponent,
    SpacecraftCreateComponent,
    CosmonautListComponent,
    DashboardComponent
  ]
})
export class SpaceModule {}
