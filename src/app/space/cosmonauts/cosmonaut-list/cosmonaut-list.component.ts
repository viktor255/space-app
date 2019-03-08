import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Observable } from 'rxjs';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllCosmonautsRequested } from '../cosmonaut.actions';
import { selectAllCosmonauts } from '../cosmonaut.selectors';

@Component({
  selector: 'app-cosmonaut-list',
  templateUrl: './cosmonaut-list.component.html'
})
export class CosmonautListComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  cosmonauts$: Observable<Cosmonaut[]>;

  ngOnInit() {
    this.store.dispatch(new AllCosmonautsRequested());
    this.cosmonauts$ = this.store.pipe(select(selectAllCosmonauts));
  }


}
