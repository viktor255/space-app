import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Spaceflight } from '../../models/spaceflight.model';
import { Observable, Subscription, timer } from 'rxjs';
import { Spacecraft } from '../../models/spacecraft.model';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { select, Store } from '@ngrx/store';
import { selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { selectCosmonautsByIds } from '../../cosmonauts/cosmonaut.selectors';
import { AppState } from '../../../reducers';
import { SpaceflightsService } from '../services/spaceflights.service';

@Component({
  selector: 'app-spaceflight-live',
  templateUrl: './spaceflight-live.component.html',
  styleUrls: ['./spaceflight-live.component.css']
})
export class SpaceflightLiveComponent implements OnInit, OnDestroy {

  @Input() spaceflight: Spaceflight;
  public spacecraft$: Observable<Spacecraft>;
  public cosmonauts$: Observable<Cosmonaut[]>;
  public cosmonauts: Cosmonaut[];
  public spacecraft: Spacecraft;

  public arriveTime: number;
  public elapsedTime: number;
  public distanceTraveled: number;
  public distanceRemaining: number;
  public fuelUsed: number;
  public fuelRemaining: number;
  public foodRemaining: number;
  public foodNeeded: number;
  public foodUsed: number;
  public foodRemainingPercent: number;
  public fuelRemainingPercent: number;

  private _spacecraftSub: Subscription;
  private _cosmonautsSub: Subscription;
  private _timerSub: Subscription;

  constructor(private store: Store<AppState>, private spaceflightsService: SpaceflightsService) {
  }

  ngOnInit() {
    if (this.spaceflight) {
      this.store.dispatch(new AllCosmonautsRequested());
      this.store.dispatch(new AllSpacecraftsRequested());
      this.spaceflightsService.joinSpaceflightSocket(this.spaceflight._id);
      this.spacecraft$ = this.store.pipe(select(selectSpacecraftById(this.spaceflight.spacecraftId)));
      this.cosmonauts$ = this.store.pipe(select(selectCosmonautsByIds(this.spaceflight.cosmonautsIds)));

      this._spacecraftSub = this.spacecraft$.subscribe((spacecraft) => {
        if (spacecraft) {
          this.spacecraft = spacecraft;
        }
      });
      this._cosmonautsSub = this.cosmonauts$.subscribe((cosmonauts: Cosmonaut[]) => {
        this.cosmonauts = cosmonauts;
      });
    }
    this._timerSub = timer(0, 1000).subscribe(() => this.everySecond());
  }


  everySecond() {
    if (this.spacecraft && this.cosmonauts) {
      this.arriveTime = this.spaceflight.startTime + (this.spaceflight.distance / this.spacecraft.speed) * 60 * 60 * 1000;
      const travelTimeMs = this.arriveTime - this.spaceflight.startTime;
      const travelTimeHours = travelTimeMs / (60 * 60 * 1000);

      this.elapsedTime = Date.now() - this.spaceflight.startTime;
      const elapsedTimeHours = this.elapsedTime / (60 * 60 * 1000);
      this.distanceTraveled = Math.floor(this.spacecraft.speed * elapsedTimeHours);
      this.distanceRemaining = Math.ceil(this.spaceflight.distance - this.distanceTraveled);

      this.fuelUsed = this.spacecraft.fuelConsumption * elapsedTimeHours;
      this.fuelRemaining = this.spacecraft.fuelTankCapacity * this.spacecraft.fuel * 0.01 - this.fuelUsed;
      this.fuelRemaining = Math.floor(this.fuelRemaining);
      this.fuelRemainingPercent = Math.floor((this.fuelRemaining / this.spacecraft.fuelTankCapacity) * 100);

      this.foodNeeded = 0;
      this.foodUsed = 0;
      this.cosmonauts.forEach((cosmonaut: Cosmonaut) => {
        this.foodNeeded += cosmonaut.foodConsumption * travelTimeHours;
      });
      this.cosmonauts.forEach((cosmonaut: Cosmonaut) => {
        const ageOfCosmonaut = this.getAge(cosmonaut.dateOfBirth);
        if (ageOfCosmonaut <= 40 && ageOfCosmonaut >= 20) {
          this.foodUsed += cosmonaut.foodConsumption * elapsedTimeHours * 0.7;
        } else {
          this.foodUsed += cosmonaut.foodConsumption * elapsedTimeHours;
        }
      });
      this.foodRemaining = this.spacecraft.foodBoxCapacity * this.spacecraft.food * 0.01 - this.foodUsed;
      this.foodRemaining = Math.floor(this.foodRemaining);
      this.foodRemainingPercent = Math.floor((this.foodRemaining / this.spacecraft.foodBoxCapacity) * 100);
    }

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


  onDelete() {
    this.spaceflightsService.destroySpaceflightRequest(this.spaceflight._id);
  }

  ngOnDestroy() {
    this._spacecraftSub.unsubscribe();
    this._cosmonautsSub.unsubscribe();
    this._timerSub.unsubscribe();
  }

}
