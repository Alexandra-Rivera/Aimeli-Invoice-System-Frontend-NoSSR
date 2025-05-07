import { TestBed } from '@angular/core/testing';

import { ComprasServiceService } from './compras-service.service';

describe('ComprasServiceService', () => {
  let service: ComprasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
