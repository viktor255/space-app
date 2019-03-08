import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { AllCosmonautsRequested, Create, Update } from '../cosmonaut.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectCosmonautById } from '../cosmonaut.selectors';
import { Cosmonaut } from '../../models/cosmonaut.model';

@Component({
  selector: 'app-cosmonaut-create',
  templateUrl: './cosmonaut-create.component.html',
  styleUrls: ['./cosmonaut-create.component.css']
})
export class CosmonautCreateComponent implements OnInit {
  public mode = 'Create';
  private cosmonautId: string;
  private cosmonautToEdit$: Observable<Cosmonaut>;
  public defaultCosmonaut: Cosmonaut;
  public isLoading = true;

  constructor(private store: Store<AppState>, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('cosmonautId')) {
          this.store.dispatch(new AllCosmonautsRequested());
          this.mode = 'Edit';
          this.cosmonautId = paramMap.get('cosmonautId');
          this.cosmonautToEdit$ = this.store.pipe(select(selectCosmonautById(this.cosmonautId)));
          this.cosmonautToEdit$.subscribe(cosmonaut => {
            this.defaultCosmonaut = cosmonaut;
            if (cosmonaut !== undefined) {
              this.isLoading = false;
            }
          });

        } else {
          this.defaultCosmonaut = {
            _id: 'dummy',
            email: 'jurij.gagarin@zssrdummy.ru',
            name: 'Jurij Alexejevič Gagarin',
            dateOfBirth: '1934-03-09',
            weight: 75,
            foodConsumption: 1
          };
          this.isLoading = false;
          this.cosmonautId = null;
          this.mode = 'Create';
        }
      }
    );
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'Create') {
      this.defaultCosmonaut = {
        _id: this.cosmonautId,
        email: form.value.email,
        name: form.value.name,
        dateOfBirth: form.value.dateOfBirth,
        weight: form.value.weight,
        foodConsumption: form.value.foodConsumption
      };
      this.store.dispatch(new Create({cosmonaut: this.defaultCosmonaut}));
    } else {
      this.defaultCosmonaut = {
        _id: this.cosmonautId,
        email: this.defaultCosmonaut.email,
        name: form.value.name,
        dateOfBirth: form.value.dateOfBirth,
        weight: form.value.weight,
        foodConsumption: form.value.foodConsumption
      };
      this.store.dispatch(new Update({cosmonaut: this.defaultCosmonaut}));
    }
    this.router.navigateByUrl('/');
  }
}
