import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable, Subscription } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested } from '../spaceflight.actions';
import { selectAllSpaceflights, selectCosmonautsSpaceflights } from '../spaceflight.selectors';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { emailSelector } from '../../../auth/auth.selector';
import { selectCosmonautByEmail } from '../../cosmonauts/cosmonaut.selectors';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-spaceflight-list',
  templateUrl: './spaceflight-list.component.html'
})
export class SpaceflightListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) {
  }

  spaceflights$: Observable<Spaceflight[]>;
  finishedSpaceflights: Spaceflight[];
  currentSpaceflights: Spaceflight[];
  plannedSpaceflights: Spaceflight[];

  private _spaceflightsSub: Subscription;

  ngOnInit() {
    this.store.dispatch(new AllSpaceflightsRequested());
    this.store.dispatch(new AllCosmonautsRequested());
    this.store.dispatch(new AllSpacecraftsRequested());

    this.spaceflights$ = this.store.pipe(select(selectAllSpaceflights));
    this._spaceflightsSub = this.spaceflights$.subscribe((spaceflights: Spaceflight[]) => {
      this.finishedSpaceflights = [];
      this.currentSpaceflights = [];
      this.plannedSpaceflights = [];
      spaceflights.forEach((spaceflight: Spaceflight) => {
        this.store.pipe(select(selectSpacecraftById(spaceflight.spacecraftId))).pipe(take(2)).subscribe(spacecraft => {
          if (spacecraft) {
            const arriveTime = spaceflight.startTime + (spaceflight.distance / spacecraft.speed) * 60 * 60 * 1000;
            if (spaceflight.startTime < Date.now() && arriveTime > Date.now()) {
              this.currentSpaceflights.push(spaceflight);
            }
            if (arriveTime < Date.now()) {
              this.finishedSpaceflights.push(spaceflight);
            }
            if (spaceflight.startTime > Date.now()) {
              this.plannedSpaceflights.push(spaceflight);
            }
          }
        });
      });
    });
  }


  ngOnDestroy() {
    this._spaceflightsSub.unsubscribe();
  }


}
