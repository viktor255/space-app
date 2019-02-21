import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested, Create } from '../spaceflight.actions';
import { selectAllSpaceflights, selectSpaceflightById } from '../spaceflight.selectors';
import { Spacecraft } from '../../models/spacecraft.model';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { selectAllSpacecrafts, selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { selectAllCosmonauts } from '../../cosmonauts/cosmonaut.selectors';

import * as SpaceCraftActions from '../../spacecrafts/spacecraft.actions';
import { MatDialog } from '@angular/material';
import { SpaceflightErrorComponent } from '../spaceflight-error/spaceflight-error.component';

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

  public spacecrafts$: Observable<Spacecraft[]>;
  public cosmonauts$: Observable<Cosmonaut[]>;
  public spaceflights$: Observable<Spaceflight[]>;

  public arriveTime: number;
  public startDate: string;
  public food: number;
  public fuel: number;
  public selectedSpacecraft: Spacecraft;
  public selectedCosmonauts: Cosmonaut[];
  public currentWeight = 0;

  public foodProblem = false;
  public foodProblemStarvation = false;
  public fuelProblem = false;
  public weightProblem = false;
  public cosmonautUnavailableProblem = false;

  private fuelProblemMessage: string;
  private foodProblemMessage: string;
  private foodProblemStarvationMessage: string;
  private weightProblemMessage: string;

  private cosmonautsUnavailable: Cosmonaut[] = [];
  private cosmonautsUnavailabilityMessage = '';

  constructor(private store: Store<AppState>, public route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
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
    this.store.dispatch(new AllSpaceflightsRequested());
    this.spaceflights$ = this.store.pipe(select(selectAllSpaceflights));
  }

  onSelectChange() {
    this.spaceflight.spacecraftId = this.selectedSpacecraft._id;
    this.spaceflight.startTime = new Date(this.startDate).valueOf();
    console.log('On select change activated');
    console.log('Start date from input: ' + this.startDate);
    // console.log('This is before epocha' + this.spaceflight.startTime);
    this.arriveTime = this.spaceflight.startTime + (this.spaceflight.distance / this.selectedSpacecraft.speed) * 60 * 60 * 1000;
  }

  saveCosmonauts() {
    this.selectedCosmonauts.forEach(cosmonaut => {
      if (!this.spaceflight.cosmonautsIds.includes(cosmonaut._id)) {
        this.spaceflight.cosmonautsIds.push(cosmonaut._id);
      }
    });
  }

  changeFoodAndFuel() {
    if (this.food === undefined) {
      this.food = this.selectedSpacecraft.food;
    }
    if (this.fuel === undefined) {
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

  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  calculateWeight() {
    this.currentWeight = 0;
    this.selectedCosmonauts.forEach(cosmonaut => {
      this.currentWeight += cosmonaut.weight;
    });
    this.currentWeight += this.selectedSpacecraft.foodBoxCapacity * (this.food / 100);
    if (this.currentWeight >= this.selectedSpacecraft.maximumLoad) {
      console.log('Spacecraft is overloaded');
      this.weightProblem = true;
      this.weightProblemMessage = 'Spacecraft is overloaded. Change quantity of food or cosmonauts '
        + 'Current load is: ' + this.currentWeight + 'kg.'
        + ' Maximum load is: ' + this.selectedSpacecraft.maximumLoad + 'kg.';
    } else {
      this.weightProblem = false;
      this.weightProblemMessage = '';
    }
    console.log('Current weight is: ' + this.currentWeight);
    console.log('Maximum load is: ' + this.selectedSpacecraft.maximumLoad);

  }

  calculateFuel() {
    const currentFuel = (this.fuel / 100) * this.selectedSpacecraft.fuelTankCapacity;
    const travelTimeMs = this.arriveTime - this.spaceflight.startTime;
    const travelTimeHours = travelTimeMs / (1000 * 60 * 60);
    const fuelNeeded = Math.ceil(travelTimeHours * this.selectedSpacecraft.fuelConsumption);
    const fuelNeededPercentage = Math.ceil((fuelNeeded / this.selectedSpacecraft.fuelTankCapacity) * 100);

    if (currentFuel < fuelNeeded) {
      console.log('Spacecraft has not enough fuel');
      this.fuelProblem = true;
      if (fuelNeeded > this.selectedSpacecraft.fuelTankCapacity) {
        this.fuelProblemMessage = 'This spacecraft can not fly that far. '
          + 'Maximum fuel is: ' + this.selectedSpacecraft.fuelTankCapacity + 'l.'
          + ' Fuel needed for this flight is: ' + fuelNeeded + 'l.';
      } else {
        this.fuelProblemMessage = 'Spacecraft has not enough fuel. Fill the tank to at least ' + fuelNeededPercentage + '%. '
          + 'Current fuel is: ' + currentFuel + 'l.'
          + ' Fuel needed for this flight is: ' + fuelNeeded + 'l.';
      }
    } else {
      this.fuelProblem = false;
      this.fuelProblemMessage = '';
    }
    // console.log('Current fuel is: ' + currentFuel);
    // console.log('Fuel needed for this flight is: ' + fuelNeeded);
  }

  calculateFood() {
    const currentFood = (this.food / 100) * this.selectedSpacecraft.foodBoxCapacity;
    const travelTimeMs = this.arriveTime - this.spaceflight.startTime;
    const travelTimeHours = travelTimeMs / (1000 * 60 * 60);
    let foodNeeded = 0;
    let foodNeededHungry = 0;
    this.selectedCosmonauts.forEach(cosmonaut => {
      foodNeeded += cosmonaut.foodConsumption * travelTimeHours;
      const ageOfCosmonaut = this.getAge(cosmonaut.dateOfBirth);
      if (ageOfCosmonaut <= 40 && ageOfCosmonaut >= 20) {
        foodNeededHungry += cosmonaut.foodConsumption * travelTimeHours * 0.7;
      } else {
        foodNeededHungry += cosmonaut.foodConsumption * travelTimeHours;
      }
      console.log('Age of cosmonaut ' + cosmonaut.name + ' is: ' + this.getAge(cosmonaut.dateOfBirth));
    });
    foodNeeded = Math.ceil(foodNeeded);
    foodNeededHungry = Math.ceil(foodNeededHungry);

    const foodNeededPercentageHungry = Math.ceil((foodNeededHungry / this.selectedSpacecraft.foodBoxCapacity) * 100);
    const foodNeededPercentage = Math.ceil((foodNeeded / this.selectedSpacecraft.foodBoxCapacity) * 100);

    if (currentFood < foodNeeded && currentFood > foodNeededHungry) {
      console.log('Young cosmonauts will starve for max 30% of time');
      this.foodProblemStarvation = true;
      this.foodProblemStarvationMessage = 'Young cosmonauts will starve for max 30% of time. Fill up to at least '
        + foodNeededPercentage + '%.'
        + 'Current food is: ' + currentFood + 'kg.'
        + ' Food needed for this flight without starvation is: ' + foodNeeded + 'kg.';
    } else {
      this.foodProblemStarvationMessage = '';
      this.foodProblemStarvation = false;
    }
    if (currentFood < foodNeededHungry) {
      console.log('Spacecraft has not enough food');
      this.foodProblem = true;

      if (foodNeededHungry > this.selectedSpacecraft.foodBoxCapacity) {
        this.foodProblemMessage = 'Spacecraft has small foodbox for such a long flight. '
          + 'Maximum food is: ' + this.selectedSpacecraft.foodBoxCapacity + 'kg.'
          + ' Food needed for this flight is: ' + foodNeededHungry + '/' + foodNeeded + 'kg.';

      } else {
        this.foodProblemMessage = 'Spacecraft has not enough food. Add food. To at least '
          + foodNeededPercentageHungry + '% / '
          + foodNeededPercentage + '%.'
          + 'Current food is: ' + currentFood + 'kg.'
          + ' Food needed for this flight is: ' + foodNeededHungry + '/' + foodNeeded + 'kg.';
      }

    } else {
      this.foodProblem = false;
      this.foodProblemMessage = '';
    }
    console.log('Current food is: ' + currentFood);
    console.log('Food needed for this flight without starvation is: ' + foodNeeded);
    console.log('Food needed for this flight with starvation is: ' + foodNeededHungry);
  }

  calculateCosmonautsAvailability() {
    this.cosmonautsUnavailabilityMessage = '';
    // this.selectedCosmonauts.forEach(cosmonaut => {});
    this.spaceflights$.subscribe((spaceflights: Spaceflight[]) => {
      spaceflights.forEach((otherSpaceflight) => {
        // console.log('This will be other Spaceflight');
        // console.log(otherSpaceflight);
        const otherSpacecraft$ = this.store.pipe(select(selectSpacecraftById(otherSpaceflight.spacecraftId)));
        otherSpacecraft$.subscribe(otherSpacecraft => {
          const otherArriveTime = otherSpaceflight.startTime + (otherSpaceflight.distance / otherSpacecraft.speed) * 60 * 60 * 1000;
          // console.log('This is other arriveTime ' + otherArriveTime);

          this.selectedCosmonauts.forEach((thisSpaceflightCosmonaut) => {
            otherSpaceflight.cosmonautsIds.forEach((otherSpaceflightCosmonautId) => {
              // console.log('This should happen 4 times');
              if (thisSpaceflightCosmonaut._id === otherSpaceflightCosmonautId) {
                // console.log('Cosmonauts id match found');
                if (otherSpaceflight.startTime * 1000 < this.spaceflight.startTime) {
                  // console.log('Other starts first');
                  // console.log('This spaceflight start time ' + this.spaceflight.startTime);
                  if (otherArriveTime > this.spaceflight.startTime) {
                    console.log(thisSpaceflightCosmonaut.name + ' is unavailable at given time.');
                    this.cosmonautsUnavailable.push(thisSpaceflightCosmonaut);
                    this.cosmonautUnavailableProblem = true;
                    this.cosmonautsUnavailabilityMessage = this.cosmonautsUnavailabilityMessage
                      + thisSpaceflightCosmonaut.name + ' is unavailable at given time. ';
                  } else {
                    this.cosmonautUnavailableProblem = false;
                    this.cosmonautsUnavailabilityMessage = '';
                  }
                } else {
                  // console.log('This starts first');
                  if (this.arriveTime > otherSpaceflight.startTime * 1000) {
                    console.log(thisSpaceflightCosmonaut.name + ' is unavailable at given time.');
                    this.cosmonautsUnavailable.push(thisSpaceflightCosmonaut);
                    this.cosmonautUnavailableProblem = true;
                    this.cosmonautsUnavailabilityMessage = this.cosmonautsUnavailabilityMessage
                      + thisSpaceflightCosmonaut.name + ' is unavailable at given time. ';
                  } else {
                    this.cosmonautUnavailableProblem = false;
                    this.cosmonautsUnavailabilityMessage = '';
                  }
                }
              }
            });
          });
        });
      });
    });
  }

  checkProblems() {
    if (this.foodProblem || this.fuelProblem || this.foodProblemStarvation || this.weightProblem) {
      this.dialog.open(SpaceflightErrorComponent, {
        data: {
          message: this.fuelProblemMessage,
          message2: this.foodProblemMessage,
          message3: this.foodProblemStarvationMessage,
          message4: this.weightProblemMessage,
          message5: this.cosmonautsUnavailabilityMessage
        }
      });
    }
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
      this.calculateWeight();
      this.calculateFuel();
      this.calculateFood();
      this.calculateCosmonautsAvailability();
      this.checkProblems();

    } else {
      // this.store.dispatch(new Update({spaceflight: this.spaceflight}));
    }

    // this.spaceflight.spacecraft.food = form.value.food;
    console.log(this.spaceflight);

    // this.router.navigateByUrl('/');
  }
}
