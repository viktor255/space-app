import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { Delete } from '../cosmonaut.actions';

@Component({
  selector: 'app-cosmonaut',
  templateUrl: './cosmonaut.component.html',
  styleUrls: ['./cosmonaut.component.css']
})

export class CosmonautComponent {
  constructor(private store: Store<AppState>) {
  }

  @Input() cosmonaut: Cosmonaut;

  onDelete() {
    this.store.dispatch(new Delete({_id: this.cosmonaut._id}));
  }

}
