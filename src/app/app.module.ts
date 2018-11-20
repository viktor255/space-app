 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 import { SpacecraftCreateComponent } from './spacecrafts/spacecraft-create.component';
 import { SpacecraftComponent } from './spacecrafts/spacecraft.component';
 import { SpacecraftListComponent } from './spacecrafts/spacecraft-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule } from '@angular/material';
 import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    SpacecraftComponent,
    SpacecraftCreateComponent,
    SpacecraftListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
