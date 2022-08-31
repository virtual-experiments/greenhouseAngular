import { TestBed } from '@angular/core/testing';

import { GroupPasserService } from './group-passer.service';

describe('GroupPasserService', () => {
  let service: GroupPasserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupPasserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
