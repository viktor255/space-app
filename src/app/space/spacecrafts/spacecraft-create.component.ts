import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Spacecraft } from '../models/spacecraft.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { Create } from './spacecraft.actions';

@Component({
  selector: 'app-spacecraft-create',
  templateUrl: './spacecraft-create.component.html',
  styleUrls: ['./spacecraft-create.component.css']
})
export class SpacecraftCreateComponent {
  constructor(private store: Store<AppState>) {
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const newSpacecraft: Spacecraft = {
      id: 'dummy',
      name: form.value.name,
      numberOfSeats: form.value.numOfSeats,
      fuelTankCapacity: form.value.fuelTankCapacity,
      fuel: 0,
      fuelConsumption: form.value.fuelConsumption,
      speed: form.value.speed,
      maximumLoad: form.value.maxLoad,
      foodBoxCapacity: form.value.foodBoxCapacity
    };
    this.store.dispatch(new Create({spacecraft: newSpacecraft}));

    console.log(newSpacecraft);
  }
}
