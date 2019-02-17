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
  public spaceflight: Spaceflight;
  public isLoading = true;

  spacecrafts$: Observable<Spacecraft[]>;
  cosmonauts$: Observable<Cosmonaut[]>;

  public arriveTime: number;
  public startDate: string;
  public food: number;
  public fuel: number;
  public selectedSpacecraft: Spacecraft;
  public selectedCosmonauts: Cosmonaut[];
  public currentWeight = 0;

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
            this.spaceflight = spaceflight;
            if (spaceflight !== undefined) {
              this.isLoading = false;
            }
          });

        } else {
          this.spaceflight = {
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
    this.spaceflight.spacecraftId = this.selectedSpacecraft._id;
    this.spaceflight.startTime = new Date(this.startDate).valueOf();
    console.log('On select change activated');
    console.log('Start date from input: ' + this.startDate);
    // console.log('This is before epocha' + this.spaceflight.startTime);
    this.arriveTime = this.spaceflight.startTime.valueOf()
      + (this.spaceflight.distance / this.selectedSpacecraft.speed) * 60 * 60 * 1000;
  }

  onSpacecraftChange() {

    console.log('onSpacecraftChange method invoked');
    // console.log(this.spaceflight.spacecraftId.food);
    // console.log(this.spaceflight.spacecraftId);
  }

  saveCosmonauts() {
    this.selectedCosmonauts.forEach(cosmonaut => {
      if (!this.spaceflight.cosmonautsIds.includes(cosmonaut._id)) {
        this.spaceflight.cosmonautsIds.push(cosmonaut._id);
      }
    });
  }

  changeFoodAndFuel() {
    if (!this.food) {
      this.food = this.selectedSpacecraft.food;
    }
    if (!this.fuel) {
      this.fuel = this.selectedSpacecraft.fuel;
    }
    this.selectedSpacecraft = {
      _id: this.selectedSpacecraft._id,
      name: this.selectedSpacecraft.name,
      numberOfSeats: this.selectedSpacecraft.numberOfSeats,
      fuelTankCapacity: this.selectedSpacecraft.fuelTankCapacity,
      fuel: this.fuel,
      fuelConsumption: this.selectedSpacecraft.fuelConsumption,
      speed: this.selectedSpacecraft.speed,
      maximumLoad: this.selectedSpacecraft.maximumLoad,
      foodBoxCapacity: this.selectedSpacecraft.foodBoxCapacity,
      food: this.food
    };
    this.store.dispatch(new SpaceCraftActions.Update({spacecraft: this.selectedSpacecraft}));
  }

  currentWeightCalculation() {
    this.currentWeight = 0;
    this.selectedCosmonauts.forEach(cosmonaut => {
      this.currentWeight += cosmonaut.weight;
    });
    this.currentWeight += this.selectedSpacecraft.foodBoxCapacity * (this.food / 100);
    if (this.currentWeight >= this.selectedSpacecraft.maximumLoad) {
      console.log('Spacecraft is overloaded');
    }
    console.log('Current weight is: ' + this.currentWeight);
    console.log('Maximum load is: ' + this.selectedSpacecraft.maximumLoad);
  }

  calculateFuel() {
    const currentFuel = (this.fuel / 100) * this.selectedSpacecraft.fuelTankCapacity;
    const travelTimeMs = this.arriveTime - this.spaceflight.startTime;
    const travelTimeHours = travelTimeMs / (1000 * 60 * 60);
    const fuelNeeded = travelTimeHours * this.selectedSpacecraft.fuelConsumption;

    if (currentFuel < fuelNeeded) {
      console.log('Spacecraft has not enough fuel');
    }
    console.log('Current fuel is: ' + currentFuel);
    console.log('Fuel needed for this flight is: ' + fuelNeeded);
  }


  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.spaceflight = {
    //   _id: this.spaceflightId,
    //   distance: form.value.distance,
    //   startTime: form.value.startTime,
    //   isStarted: false,
    //   spacecraft: undefined,
    //   cosmonauts: []
    // };


    if (this.mode === 'Create') {
      // console.log(this.spaceflight);
      // this.store.dispatch(new Create({spaceflight: this.spaceflight}));
      this.changeFoodAndFuel();
      this.saveCosmonauts();
      this.currentWeightCalculation();
      this.calculateFuel();

    } else {
      // this.store.dispatch(new Update({spaceflight: this.spaceflight}));
    }

    // this.spaceflight.spacecraft.food = form.value.food;
    console.log(this.spaceflight);

    // this.router.navigateByUrl('/');
  }
}
