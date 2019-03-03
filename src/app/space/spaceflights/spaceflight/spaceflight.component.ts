import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Spaceflight } from '../../models/spaceflight.model';
import { Observable } from 'rxjs';
import { Spacecraft } from '../../models/spacecraft.model';
import { selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { selectCosmonautsByIds } from '../../cosmonauts/cosmonaut.selectors';
import { Delete } from '../spaceflight.actions';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';

@Component({
  selector: 'app-spaceflight',
  templateUrl: './spaceflight.component.html',
  styleUrls: ['./spaceflight.component.css']
})

export class SpaceflightComponent implements OnInit {

  @Input() spaceflight: Spaceflight;
  public spacecraft$: Observable<Spacecraft>;
  public cosmonauts$: Observable<Cosmonaut[]>;
  public arriveTime: number;

  ngOnInit() {
    if (this.spaceflight) {
      this.store.dispatch(new AllCosmonautsRequested());
      this.store.dispatch(new AllSpacecraftsRequested());
      this.spacecraft$ = this.store.pipe(select(selectSpacecraftById(this.spaceflight.spacecraftId)));
      this.cosmonauts$ = this.store.pipe(select(selectCosmonautsByIds(this.spaceflight.cosmonautsIds)));

      this.spacecraft$.subscribe((spacecraft) => {
        if (spacecraft) {
          this.arriveTime = this.spaceflight.startTime + (this.spaceflight.distance / spacecraft.speed) * 60 * 60 * 1000;
        }
      });
    }


  }

  constructor(private store: Store<AppState>) {
  }


  onDelete() {
    this.store.dispatch(new Delete({_id: this.spaceflight._id}));
  }

}
