import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested, Create, Update } from '../spaceflight.actions';
import { selectSpaceflightById } from '../spaceflight.selectors';
import { Spacecraft } from '../../models/spacecraft.model';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { selectAllSpacecrafts } from '../../spacecrafts/spacecraft.selectors';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { selectAllCosmonauts } from '../../cosmonauts/cosmonaut.selectors';

import * as SpaceCraftActions from '../../spacecrafts/spacecraft.actions';

@Component({
  selector: 'app-spaceflight-create',
  templateUrl: './spaceflight-create.component.html',
  styleUrls: ['./spaceflight-create.component.css']
})
export class SpaceflightCreateComponent implements OnInit {
  public mode = 'Create';
  private spaceflightId: string;
  private spaceflightToEdit$: Observable<Spaceflight>;
  public defaultSpaceflight: Spaceflight;
  public isLoading = true;

  spacecrafts$: Observable<Spacecraft[]>;
  cosmonauts$: Observable<Cosmonaut[]>;

  public arriveTime: number;
  public startDate: string;
  public food: number;
  public fuel: number;

  constructor(private store: Store<AppState>, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('spaceflightId')) {
          this.store.dispatch(new AllSpaceflightsRequested());
          this.mode = 'Edit';
          this.spaceflightId = paramMap.get('spaceflightId');
          this.spaceflightToEdit$ = this.store.pipe(select(selectSpaceflightById(this.spaceflightId)));
          this.spaceflightToEdit$.subscribe(spaceflight => {
            this.defaultSpaceflight = spaceflight;
            if (spaceflight !== undefined) {
              this.isLoading = false;
            }
          });

        } else {
          this.defaultSpaceflight = {
            _id: 'dummy',
            distance: 384400,
            startTime: Date.now(),
            isStarted: false,
            spacecraftId: undefined,
            cosmonautsIds: []
          };
          this.startDate = '1975-02-20';
          this.isLoading = false;
          this.spaceflightId = null;
          this.mode = 'Create';
        }
      }
    );
    this.store.dispatch(new AllSpacecraftsRequested());
    this.spacecrafts$ = this.store.pipe(select(selectAllSpacecrafts));
    this.store.dispatch(new AllCosmonautsRequested());
    this.cosmonauts$ = this.store.pipe(select(selectAllCosmonauts));


  }

  onSelectChange() {
    this.defaultSpaceflight.startTime = new Date(this.startDate).valueOf();
    console.log('On select change activated');
    console.log('Start date from input: ' + this.startDate);
    // console.log('This is before epocha' + this.defaultSpaceflight.startTime);
    // this.arriveTime = this.defaultSpaceflight.startTime.valueOf()
    //   + (this.defaultSpaceflight.distance / this.defaultSpaceflight.spacecraftId.speed) * 60 * 60 * 1000;
  }

  onSpacecraftChange() {

    console.log('onSpacecraftChange method invoked');
    // console.log(this.defaultSpaceflight.spacecraftId.food);
    // console.log(this.defaultSpaceflight.spacecraftId);
  }

  changeFoodAndFuel() {
    // this.defaultSpaceflight.spacecraft = {
    //   _id: this.defaultSpaceflight.spacecraft._id,
    //   name: this.defaultSpaceflight.spacecraft.name,
    //   numberOfSeats: this.defaultSpaceflight.spacecraft.numberOfSeats,
    //   fuelTankCapacity: this.defaultSpaceflight.spacecraft.fuelTankCapacity,
    //   fuel: this.fuel,
    //   fuelConsumption: this.defaultSpaceflight.spacecraft.fuelConsumption,
    //   speed: this.defaultSpaceflight.spacecraft.speed,
    //   maximumLoad: this.defaultSpaceflight.spacecraft.maximumLoad,
    //   foodBoxCapacity: this.defaultSpaceflight.spacecraft.foodBoxCapacity,
    //   food: this.food
    // };
    // this.store.dispatch(new SpaceCraftActions.Update({spacecraft: this.defaultSpaceflight.spacecraft}));
  }


  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.defaultSpaceflight = {
    //   _id: this.spaceflightId,
    //   distance: form.value.distance,
    //   startTime: form.value.startTime,
    //   isStarted: false,
    //   spacecraft: undefined,
    //   cosmonauts: []
    // };


    if (this.mode === 'Create') {
      // console.log(this.defaultSpaceflight);
      // this.store.dispatch(new Create({spaceflight: this.defaultSpaceflight}));
      this.changeFoodAndFuel();

    } else {
      // this.store.dispatch(new Update({spaceflight: this.defaultSpaceflight}));
    }

    // this.defaultSpaceflight.spacecraft.food = form.value.food;
    console.log(this.defaultSpaceflight);

    // this.router.navigateByUrl('/');
  }
}
