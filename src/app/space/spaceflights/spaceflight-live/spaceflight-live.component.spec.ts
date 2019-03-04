import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceflightLiveComponent } from './spaceflight-live.component';

describe('SpaceflightLiveComponent', () => {
  let component: SpaceflightLiveComponent;
  let fixture: ComponentFixture<SpaceflightLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceflightLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceflightLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
