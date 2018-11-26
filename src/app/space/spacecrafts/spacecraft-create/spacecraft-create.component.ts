import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Spacecraft } from '../../models/spacecraft.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Create } from '../spacecraft.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { selectAllSpacecrafts, selectSpacecraftById } from '../spacecraft.selectors';

@Component({
  selector: 'app-spacecraft-create',
  templateUrl: './spacecraft-create.component.html',
  styleUrls: ['./spacecraft-create.component.css']
})
export class SpacecraftCreateComponent implements OnInit {
  private mode = 'create';
  private spacecraftId: string;
  private spacecraftToEdit$: Observable<Spacecraft>;
  public defaultSpacecraft: Spacecraft;

  constructor(private store: Store<AppState>, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('spacecraftId')) {
          this.mode = 'edit';
          this.spacecraftId = paramMap.get('spacecraftId');
          this.spacecraftToEdit$ = this.store.pipe(select(selectSpacecraftById(this.spacecraftId)));
          this.spacecraftToEdit$.subscribe(spacecraft => {
            this.defaultSpacecraft = spacecraft;
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
            foodBoxCapacity: 200
          };
          this.spacecraftId = null;
          this.mode = 'create';
        }
      }
    );
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(new Create({spacecraft: this.defaultSpacecraft}));

    console.log(this.defaultSpacecraft);
  }
}
