import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Spacecraft } from '../../models/spacecraft.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { AllSpacecraftsRequested, Create, Update } from '../spacecraft.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectSpacecraftById } from '../spacecraft.selectors';

@Component({
  selector: 'app-spacecraft-create',
  templateUrl: './spacecraft-create.component.html',
  styleUrls: ['./spacecraft-create.component.css']
})
export class SpacecraftCreateComponent implements OnInit {
  public mode = 'Create';
  private spacecraftId: string;
  private spacecraftToEdit$: Observable<Spacecraft>;
  public defaultSpacecraft: Spacecraft;
  public isLoading = true;

  constructor(private store: Store<AppState>, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('spacecraftId')) {
          this.store.dispatch(new AllSpacecraftsRequested());
          this.mode = 'Edit';
          this.spacecraftId = paramMap.get('spacecraftId');
          this.spacecraftToEdit$ = this.store.pipe(select(selectSpacecraftById(this.spacecraftId)));
          this.spacecraftToEdit$.subscribe(spacecraft => {
            this.defaultSpacecraft = spacecraft;
            if (spacecraft !== undefined) {
              this.isLoading = false;
            }
          });

        } else {
          this.defaultSpacecraft = {
            _id: 'dummy',
            name: 'Default',
            numberOfSeats: 3,
            fuelTankCapacity: 3000,
            fuel: 0,
            fuelConsumption: 5,
            speed: 1,
            maximumLoad: 1000,
            foodBoxCapacity: 200,
            food: 0
          };
          this.isLoading = false;
          this.spacecraftId = null;
          this.mode = 'Create';
        }
      }
    );
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.defaultSpacecraft = {
      _id: this.spacecraftId,
      name: form.value.name,
      numberOfSeats: form.value.numberOfSeats,
      fuelTankCapacity: form.value.fuelTankCapacity,
      fuel: 0,
      fuelConsumption: form.value.fuelConsumption,
      speed: form.value.speed,
      maximumLoad: form.value.maximumLoad,
      foodBoxCapacity: form.value.foodBoxCapacity,
      food: 0
    };
    if (this.mode === 'Create') {
      this.store.dispatch(new Create({spacecraft: this.defaultSpacecraft}));
    } else {
      this.store.dispatch(new Update({spacecraft: this.defaultSpacecraft}));
    }
    this.router.navigateByUrl('/');
  }
}
