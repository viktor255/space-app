import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceflightListCosmonautComponent } from './spaceflight-list-cosmonaut.component';

describe('SpaceflightListCosmonautComponent', () => {
  let component: SpaceflightListCosmonautComponent;
  let fixture: ComponentFixture<SpaceflightListCosmonautComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceflightListCosmonautComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceflightListCosmonautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
