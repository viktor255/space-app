import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceflightCosmonautComponent } from './spaceflight-cosmonaut.component';

describe('SpaceflightCosmonautComponent', () => {
  let component: SpaceflightCosmonautComponent;
  let fixture: ComponentFixture<SpaceflightCosmonautComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceflightCosmonautComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceflightCosmonautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
