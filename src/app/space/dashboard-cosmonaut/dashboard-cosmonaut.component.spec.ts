import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCosmonautComponent } from './dashboard-cosmonaut.component';

describe('DashboardCosmonautComponent', () => {
  let component: DashboardCosmonautComponent;
  let fixture: ComponentFixture<DashboardCosmonautComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCosmonautComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCosmonautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
