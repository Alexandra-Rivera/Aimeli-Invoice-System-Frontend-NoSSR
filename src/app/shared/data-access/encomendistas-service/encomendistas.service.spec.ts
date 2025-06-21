import { TestBed } from '@angular/core/testing';

import { EncomendistasService } from './encomendistas.service';

describe('EncomendistasService', () => {
  let service: EncomendistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncomendistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
