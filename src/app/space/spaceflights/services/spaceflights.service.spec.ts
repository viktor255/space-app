import { TestBed } from '@angular/core/testing';

import { SpaceflightsService } from './spaceflights.service';

describe('SpaceflightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceflightsService = TestBed.get(SpaceflightsService);
    expect(service).toBeTruthy();
  });
});
