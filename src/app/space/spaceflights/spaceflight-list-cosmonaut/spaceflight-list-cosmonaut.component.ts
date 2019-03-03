import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable, Subscription } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested } from '../spaceflight.actions';
import { selectAllSpaceflights, selectCosmonautsSpaceflights } from '../spaceflight.selectors';
import { emailSelector } from '../../../auth/auth.selector';
import { selectCosmonautByEmail } from '../../cosmonauts/cosmonaut.selectors';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';

@Component({
  selector: 'app-spaceflight-list-cosmonaut',
  templateUrl: './spaceflight-list-cosmonaut.component.html',
  styleUrls: ['./spaceflight-list-cosmonaut.component.css']
})
export class SpaceflightListCosmonautComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  spaceflights$: Observable<Spaceflight[]>;
  private _userEmailSub: Subscription;
  private userEmail: string;

  ngOnInit() {
    this.store.dispatch(new AllSpaceflightsRequested());
    this.store.dispatch(new AllCosmonautsRequested());
    this._userEmailSub = this.store.pipe(select(emailSelector)).subscribe(email => {
        this.userEmail = email;
        console.log('Email is: ' + email);
        this.store.pipe(select(selectCosmonautByEmail(email))).subscribe((cosmonaut: Cosmonaut) => {
          console.log(cosmonaut);
          if (cosmonaut) {
            this.spaceflights$ = this.store.pipe(select(selectCosmonautsSpaceflights(cosmonaut._id)));
          }

        });
        // console.log('Email is: ' + email);
      }
    );


  }

}
