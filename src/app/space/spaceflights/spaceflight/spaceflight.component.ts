import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Spaceflight } from '../../models/spaceflight.model';

@Component({
  selector: 'app-spaceflight',
  templateUrl: './spaceflight.component.html',
  styleUrls: ['./spaceflight.component.css']
})

export class SpaceflightComponent {
  constructor(private store: Store<AppState>) {
  }

  @Input() spaceflight: Spaceflight;

  onDelete() {
    // this.store.dispatch(new Delete({_id: this.spaceflight._id}));
  }

}
