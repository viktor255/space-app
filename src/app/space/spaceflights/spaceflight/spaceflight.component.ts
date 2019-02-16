import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Spaceflight } from '../../models/spaceflight.model';
import { Observable } from 'rxjs';
import { Spacecraft } from '../../models/spacecraft.model';
import { selectAllSpacecrafts, selectSpacecraftById } from '../../spacecrafts/spacecraft.selectors';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { selectAllCosmonauts, selectCosmonautById } from '../../cosmonauts/cosmonaut.selectors';

@Component({
  selector: 'app-spaceflight',
  templateUrl: './spaceflight.component.html',
  styleUrls: ['./spaceflight.component.css']
})

export class SpaceflightComponent implements OnInit {

  @Input() spaceflight: Spaceflight;
  public spacecraft$: Observable<Spacecraft>;
  public cosmonauts$: Observable<Cosmonaut>[] = [];

  ngOnInit() {
    this.spacecraft$ = this.store.pipe(select(selectSpacecraftById(this.spaceflight.spacecraftId)));
    // this.spaceflight.cosmonautsIds.map()
    // console.log(this.spaceflight.cosmonautsIds);
    // console.log(this.spaceflight.spacecraftId);
    this.spaceflight.cosmonautsIds.map((cosmonaut, cosmonautIndex) => {
      this.cosmonauts$.push(this.store.pipe(select(selectCosmonautById(cosmonaut[cosmonautIndex]))));
      console.log('cosmonauts$ length: ' + this.cosmonauts$.length);
      // console.log(cosmonaut);
      console.log('cosmonaut index: ' + cosmonautIndex);
    });

  }

  constructor(private store: Store<AppState>) {
  }


  onDelete() {
    // this.store.dispatch(new Delete({_id: this.spaceflight._id}));
  }

}
