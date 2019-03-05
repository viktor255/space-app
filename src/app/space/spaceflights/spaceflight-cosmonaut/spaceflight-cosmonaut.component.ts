import { Component, Input, OnInit } from '@angular/core';
import { Spaceflight } from '../../models/spaceflight.model';
import { Observable } from 'rxjs';
import { Spacecraft } from '../../models/spacecraft.model';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllCosmonautsRequested } from '../../cosmonauts/cosmonaut.actions';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { select, Store } from '@ngrx/store';
import { selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { selectCosmonautsByIds } from '../../cosmonauts/cosmonaut.selectors';
import { AppState } from '../../../reducers';
import { Delete } from '../spaceflight.actions';
import { SpaceflightsService } from '../services/spaceflights.service';

@Component({
  selector: 'app-spaceflight-cosmonaut',
  templateUrl: './spaceflight-cosmonaut.component.html',
  styleUrls: ['./spaceflight-cosmonaut.component.css']
})
export class SpaceflightCosmonautComponent implements OnInit {

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

  constructor(private store: Store<AppState>, private spaceflightsService: SpaceflightsService) {
  }


  onDelete() {
    // this.store.dispatch(new Delete({_id: this.spaceflight._id}));
    console.log('Autodestruction started');
  }


}
