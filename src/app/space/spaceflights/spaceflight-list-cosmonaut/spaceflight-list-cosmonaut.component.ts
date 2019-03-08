import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable, Subscription } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested } from '../spaceflight.actions';
import { selectCosmonautsSpaceflights } from '../spaceflight.selectors';
import { emailSelector } from '../../../auth/auth.selector';
import { selectCosmonautByEmail } from '../../cosmonauts/cosmonaut.selectors';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-spaceflight-list-cosmonaut',
  templateUrl: './spaceflight-list-cosmonaut.component.html',
  styleUrls: ['./spaceflight-list-cosmonaut.component.css']
})
export class SpaceflightListCosmonautComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) {
  }

  spaceflights: Spaceflight[];
  spaceflights$: Observable<Spaceflight[]>;
  currentSpaceflight: Spaceflight;

  private _userEmailSub: Subscription;
  private _spaceflightsSub: Subscription;
  private _cosmonautSub: Subscription;
  private userEmail: string;

  ngOnInit() {
    this.store.dispatch(new AllSpaceflightsRequested());
    this.store.dispatch(new AllCosmonautsRequested());
    this.store.dispatch(new AllSpacecraftsRequested());
    this._userEmailSub = this.store.pipe(select(emailSelector)).subscribe(email => {
        this.userEmail = email;
        this._cosmonautSub = this.store.pipe(select(selectCosmonautByEmail(email))).subscribe((cosmonaut: Cosmonaut) => {
          if (cosmonaut) {
            this.spaceflights$ = this.store.pipe(select(selectCosmonautsSpaceflights(cosmonaut._id)));
            this._spaceflightsSub = this.spaceflights$.subscribe((spaceflights: Spaceflight[]) => {
              this.spaceflights = [];
              spaceflights.forEach((spaceflight: Spaceflight) => {
                this.store.pipe(select(selectSpacecraftById(spaceflight.spacecraftId))).pipe(take(2)).subscribe(spacecraft => {
                  if (spacecraft) {
                    const arriveTime = spaceflight.startTime + (spaceflight.distance / spacecraft.speed) * 60 * 60 * 1000;
                    if (spaceflight.startTime < Date.now() && arriveTime > Date.now()) {
                      this.currentSpaceflight = spaceflight;
                    } else {
                      this.spaceflights.push(spaceflight);
                    }
                  }
                });
              });
            });
          }

        });
      }
    );
  }

  ngOnDestroy() {
    this._spaceflightsSub.unsubscribe();
    this._userEmailSub.unsubscribe();
    this._cosmonautSub.unsubscribe();
  }

}
