import { Component, Input } from '@angular/core';
import { Spacecraft } from '../../models/spacecraft.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Delete } from '../spacecraft.actions';

@Component({
  selector: 'app-spacecraft',
  templateUrl: './spacecraft.component.html',
  styleUrls: ['./spacecraft.component.css']
})

export class SpacecraftComponent {
  constructor(private store: Store<AppState>) {
  }

  @Input() spacecraft: Spacecraft;

  onDelete() {
    this.store.dispatch(new Delete({_id: this.spacecraft._id}));
  }

  onEdit() {

  }
}
