import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowListComponent } from './chat-window-list.component';

describe('ChatWindowListComponent', () => {
  let component: ChatWindowListComponent;
  let fixture: ComponentFixture<ChatWindowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
