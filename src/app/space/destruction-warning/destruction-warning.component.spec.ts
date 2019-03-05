import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestructionWarningComponent } from './destruction-warning.component';

describe('DestructionWarningComponent', () => {
  let component: DestructionWarningComponent;
  let fixture: ComponentFixture<DestructionWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestructionWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestructionWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
