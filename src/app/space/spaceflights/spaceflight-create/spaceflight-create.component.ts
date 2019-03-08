import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested, Create, Update } from '../spaceflight.actions';
import { selectAllSpaceflights, selectSpaceflightById } from '../spaceflight.selectors';
import { Spacecraft } from '../../models/spacecraft.model';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { selectAllSpacecrafts, selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { selectAllCosmonauts, selectCosmonautsByIds } from '../../cosmonauts/cosmonaut.selectors';

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
  private cosmonautsUnavailabilityMessage = '';

  constructor(private store: Store<AppState>, public route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new AllSpacecraftsRequested());
    this.spacecrafts$ = this.store.pipe(select(selectAllSpacecrafts));
    this.store.dispatch(new AllCosmonautsRequested());
    this.cosmonauts$ = this.store.pipe(select(selectAllCosmonauts));
    this.store.dispatch(new AllSpaceflightsRequested());
    this.spaceflights$ = this.store.pipe(select(selectAllSpaceflights));

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('spaceflightId')) {
          this.store.dispatch(new AllSpaceflightsRequested());
          this.mode = 'Edit';
          this.spaceflightId = paramMap.get('spaceflightId');
          this.spaceflightToEdit$ = this.store.pipe(select(selectSpaceflightById(this.spaceflightId)));
          this.spaceflightToEdit$.subscribe((spaceflight: Spaceflight) => {
            if (spaceflight) {
              this.spaceflight = {
                _id: spaceflight._id,
                distance: spaceflight.distance,
                startTime: spaceflight.startTime,
                spacecraftId: undefined,
                cosmonautsIds: []
              };
              this.isLoading = false;
              const date = new Date(spaceflight.startTime);
              this.startDate = date.toJSON().split('T')[0];

              this.store.pipe(select(selectSpacecraftById(spaceflight.spacecraftId))).subscribe(spacecraft => {
                this.selectedSpacecraft = spacecraft;
                this.arriveTime = this.spaceflight.startTime + (this.spaceflight.distance / this.selectedSpacecraft.speed) * 60 * 60 * 1000;
              });
              this.store.pipe(select(selectCosmonautsByIds(spaceflight.cosmonautsIds))).subscribe(cosmonauts => {
                this.selectedCosmonauts = cosmonauts;
              });
            }
          });
        } else {
          this.spaceflight = {
            _id: 'dummy',
            distance: 384400,
            startTime: Date.now(),
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
  }

  onSelectChange() {
    this.spaceflight.spacecraftId = this.selectedSpacecraft._id;
    this.spaceflight.startTime = new Date(this.startDate).valueOf();
    this.food = undefined;
    this.fuel = undefined;
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
  }

  updateSpacecraftWithFuelAndFood() {
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
      this.weightProblem = true;
      this.weightProblemMessage = 'Spacecraft is overloaded. Change quantity of food or cosmonauts '
        + 'Current load is: ' + this.currentWeight + 'kg.'
        + ' Maximum load is: ' + this.selectedSpacecraft.maximumLoad + 'kg.';
    } else {
      this.weightProblem = false;
      this.weightProblemMessage = '';
    }

  }

  calculateFuel() {
    const currentFuel = (this.fuel / 100) * this.selectedSpacecraft.fuelTankCapacity;
    const travelTimeMs = this.arriveTime - this.spaceflight.startTime;
    const travelTimeHours = travelTimeMs / (60 * 60 * 1000);
    const fuelNeeded = Math.ceil(travelTimeHours * this.selectedSpacecraft.fuelConsumption);
    const fuelNeededPercentage = Math.ceil((fuelNeeded / this.selectedSpacecraft.fuelTankCapacity) * 100);

    if (currentFuel < fuelNeeded) {
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
  }

  calculateFood() {
    const currentFood = (this.food / 100) * this.selectedSpacecraft.foodBoxCapacity;
    const travelTimeMs = this.arriveTime - this.spaceflight.startTime;
    const travelTimeHours = travelTimeMs / (60 * 60 * 1000);
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
    });
    foodNeeded = Math.ceil(foodNeeded);
    foodNeededHungry = Math.ceil(foodNeededHungry);

    const foodNeededPercentageHungry = Math.ceil((foodNeededHungry / this.selectedSpacecraft.foodBoxCapacity) * 100);
    const foodNeededPercentage = Math.ceil((foodNeeded / this.selectedSpacecraft.foodBoxCapacity) * 100);

    if (currentFood < foodNeeded && currentFood > foodNeededHungry) {
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
  }

  calculateCosmonautsAvailability() {
    this.cosmonautsUnavailabilityMessage = '';
    this.cosmonautUnavailableProblem = false;
    this.spaceflights$.subscribe((spaceflights: Spaceflight[]) => {
      spaceflights.forEach((otherSpaceflight) => {
        if (this.spaceflightId === otherSpaceflight._id) {
          return;
        }
        const otherSpacecraft$ = this.store.pipe(select(selectSpacecraftById(otherSpaceflight.spacecraftId)));
        otherSpacecraft$.subscribe(otherSpacecraft => {
          const otherArriveTime = otherSpaceflight.startTime + (otherSpaceflight.distance / otherSpacecraft.speed) * 60 * 60 * 1000;
          this.selectedCosmonauts.forEach((thisSpaceflightCosmonaut) => {
            otherSpaceflight.cosmonautsIds.forEach((otherSpaceflightCosmonautId) => {
              if (thisSpaceflightCosmonaut._id === otherSpaceflightCosmonautId) {
                if (otherSpaceflight.startTime < this.spaceflight.startTime) {
                  if (otherArriveTime > this.spaceflight.startTime) {
                    console.log(thisSpaceflightCosmonaut.name + ' is unavailable at given time.');
                    this.cosmonautUnavailableProblem = true;
                    this.cosmonautsUnavailabilityMessage = this.cosmonautsUnavailabilityMessage
                      + thisSpaceflightCosmonaut.name + ' is unavailable at given time. ';
                  } else {
                    this.cosmonautUnavailableProblem = false;
                    this.cosmonautsUnavailabilityMessage = '';
                  }
                } else {
                  if (this.arriveTime > otherSpaceflight.startTime) {
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
    return (this.foodProblem || this.fuelProblem || this.foodProblemStarvation || this.weightProblem || this.cosmonautUnavailableProblem);
  }

  showError() {
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

  processSpacecraft() {
    this.changeFoodAndFuel();
    this.saveCosmonauts();
    this.calculateWeight();
    this.calculateFuel();
    this.calculateFood();
    this.calculateCosmonautsAvailability();
    if (this.checkProblems()) {
      this.showError();
    }
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.processSpacecraft();
    if (!this.checkProblems()) {
      this.updateSpacecraftWithFuelAndFood();
      if (this.mode === 'Create') {
        this.store.dispatch(new Create({spaceflight: this.spaceflight}));
      } else {
        this.store.dispatch(new Update({spaceflight: this.spaceflight}));
      }
      this.router.navigateByUrl('/');
    }
  }
}
