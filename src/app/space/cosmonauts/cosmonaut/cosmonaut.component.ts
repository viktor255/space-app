import { Component, Input } from '@angular/core';
import { Spacecraft } from '../../models/spacecraft.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Cosmonaut } from '../../models/cosmonaut.model';

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
  }

  onEdit() {

  }
}
