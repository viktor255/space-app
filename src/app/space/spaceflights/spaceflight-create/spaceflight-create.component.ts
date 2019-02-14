import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Spaceflight } from '../../models/spaceflight.model';
import { AllSpaceflightsRequested, Create, Update } from '../spaceflight.actions';
import { selectSpaceflightById } from '../spaceflight.selectors';
import { Spacecraft } from '../../models/spacecraft.model';
import { Cosmonaut } from '../../models/cosmonaut.model';
import { AllSpacecraftsRequested } from '../../spacecrafts/spacecraft.actions';
import { selectAllSpacecrafts } from '../../spacecrafts/spacecraft.selectors';

@Component({
  selector: 'app-spaceflight-create',
  templateUrl: './spaceflight-create.component.html',
  styleUrls: ['./spaceflight-create.component.css']
})
export class SpaceflightCreateComponent implements OnInit {
  public mode = 'Create';
  private spaceflightId: string;
  private spaceflightToEdit$: Observable<Spaceflight>;
  public defaultSpaceflight: Spaceflight;
  public isLoading = true;

  spacecrafts$: Observable<Spacecraft[]>;
  selectedValue: string;

  constructor(private store: Store<AppState>, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('spaceflightId')) {
          this.store.dispatch(new AllSpaceflightsRequested());
          this.mode = 'Edit';
          this.spaceflightId = paramMap.get('spaceflightId');
          this.spaceflightToEdit$ = this.store.pipe(select(selectSpaceflightById(this.spaceflightId)));
          this.spaceflightToEdit$.subscribe(spaceflight => {
            this.defaultSpaceflight = spaceflight;
            if (spaceflight !== undefined) {
              this.isLoading = false;
            }
          });

        } else {
          this.defaultSpaceflight = {
            _id: 'dummy',
            distance: 350504,
            startTime: Date.now(),
            isStarted: false,
            spacecraft: undefined,
            cosmonauts: []
          };
          this.isLoading = false;
          this.spaceflightId = null;
          this.mode = 'Create';
        }
      }
    );
    this.store.dispatch(new AllSpacecraftsRequested());
    this.spacecrafts$ = this.store.pipe(select(selectAllSpacecrafts));
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.defaultSpaceflight = {
      _id: this.spaceflightId,
      distance: form.value.distance,
      startTime: form.value.startTime,
      isStarted: false,
      spacecraft: undefined,
      cosmonauts: []
    };
    if (this.mode === 'Create') {
      // this.store.dispatch(new Create({spaceflight: this.defaultSpaceflight}));
    } else {
      // this.store.dispatch(new Update({spaceflight: this.defaultSpaceflight}));
    }

    console.log(this.defaultSpaceflight);
    this.router.navigateByUrl('/');
  }
}
