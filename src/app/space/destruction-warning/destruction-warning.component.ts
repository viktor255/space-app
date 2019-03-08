import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectSpaceflightById } from '../spaceflights/spaceflight.selectors';
import { Spaceflight } from '../models/spaceflight.model';
import { selectSpacecraftById } from '../spacecrafts/spacecraft.selectors';
import { Spacecraft } from '../models/spacecraft.model';
import { SpaceflightsService } from '../spaceflights/services/spaceflights.service';

@Component({
  selector: 'app-destruction-warning',
  templateUrl: './destruction-warning.component.html',
  styleUrls: ['./destruction-warning.component.css']
})
export class DestructionWarningComponent implements OnInit, OnDestroy {

  public timer: number;
  private _timerSub: Subscription;
  private _timerDestructionSub: Subscription;
  private spaceflight$: Observable<Spaceflight>;
  private _spaceflightSub: Subscription;
  private spacecraft$: Observable<Spacecraft>;
  private _spacecraftSub: Subscription;
  public spacecraft: Spacecraft;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { spaceflightId: string },
    private store: Store<AppState>,
    private spaceflightsService: SpaceflightsService) {
  }

  ngOnInit() {
    this.spaceflight$ = this.store.pipe(select(selectSpaceflightById(this.data.spaceflightId)));
    this._spaceflightSub = this.spaceflight$.subscribe(spaceflight => {
      this.spacecraft$ = this.store.pipe(select(selectSpacecraftById(spaceflight.spacecraftId)));
      this._spacecraftSub = this.spacecraft$.subscribe(spacecraft => {
        this.spacecraft = spacecraft;
      });
    });

    this.timer = 10;
    this._timerSub = timer(0, 1000).pipe(take(10)).subscribe(() => this.everySecond());
    this._timerDestructionSub = timer(10000, 10000).pipe(take(1)).subscribe(() => this.destroySpacecraft());
  }

  everySecond() {
    if (this.timer !== 0) {
      this.timer--;
    }
  }

  destroySpacecraft() {
    this.spaceflightsService.destroySpaceflight(this.data.spaceflightId);
  }

  ngOnDestroy() {
    this._timerSub.unsubscribe();
    this._timerDestructionSub.unsubscribe();
    this._spacecraftSub.unsubscribe();
    this._spaceflightSub.unsubscribe();
  }

}
