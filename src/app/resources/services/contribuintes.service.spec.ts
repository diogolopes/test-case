import { TestBed } from '@angular/core/testing';

import { ContribuintesService } from './contribuintes.service';

describe('ContribuintesService', () => {
  let service: ContribuintesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContribuintesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
