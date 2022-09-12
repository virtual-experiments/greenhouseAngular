import { TestBed } from '@angular/core/testing';

import { GrowingPlantsService } from './growing-plants.service';

describe('GrowingPlantsService', () => {
  let service: GrowingPlantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowingPlantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
