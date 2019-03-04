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
import { CosmonautCreateComponent } from './cosmonauts/cosmonaut-create/cosmonaut-create.component';
import { SpaceflightComponent } from './spaceflights/spaceflight/spaceflight.component';
import { SpaceflightListComponent } from './spaceflights/spaceflight-list/spaceflight-list.component';
import { spaceflightReducer } from './reducers/spaceflights.reducer';
import { SpaceflightEffects } from './spaceflights/spaceflight.effects';
import { SpaceflightCreateComponent } from './spaceflights/spaceflight-create/spaceflight-create.component';
import { SpaceflightErrorComponent } from './spaceflights/spaceflight-error/spaceflight-error.component';
import { ErrorComponent } from '../error/error.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MinDirective } from './directives/minDirective.directive';
import { MaxDirective } from './directives/maxDirective.directive';
import { DashboardCosmonautComponent } from './dashboard-cosmonaut/dashboard-cosmonaut.component';
import { SpaceflightListCosmonautComponent } from './spaceflights/spaceflight-list-cosmonaut/spaceflight-list-cosmonaut.component';
import { DashboardOperatorComponent } from './dashboard-operator/dashboard-operator.component';
import { SpaceflightCosmonautComponent } from './spaceflights/spaceflight-cosmonaut/spaceflight-cosmonaut.component';
import { SpaceflightLiveComponent } from './spaceflights/spaceflight-live/spaceflight-live.component';

@NgModule({
  declarations: [
    SpacecraftComponent,
    SpacecraftCreateComponent,
    SpacecraftListComponent,
    CosmonautComponent,
    CosmonautListComponent,
    CosmonautCreateComponent,
    DashboardComponent,
    SpaceflightComponent,
    SpaceflightListComponent,
    SpaceflightCreateComponent,
    SpaceflightErrorComponent,
    MinDirective,
    MaxDirective,
    DashboardCosmonautComponent,
    SpaceflightListCosmonautComponent,
    DashboardOperatorComponent,
    SpaceflightCosmonautComponent,
    SpaceflightLiveComponent
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
    StoreModule.forFeature('spaceflights', spaceflightReducer),
    EffectsModule.forFeature([SpacecraftEffects]),
    EffectsModule.forFeature([CosmonautEffects]),
    EffectsModule.forFeature([SpaceflightEffects]),
  ],
  exports: [
    SpacecraftListComponent,
    SpacecraftCreateComponent,
    CosmonautListComponent,
    CosmonautCreateComponent,
    SpaceflightListComponent,
    SpaceflightCreateComponent,
    DashboardComponent
  ],
  entryComponents: [SpaceflightErrorComponent]
})
export class SpaceModule {}
