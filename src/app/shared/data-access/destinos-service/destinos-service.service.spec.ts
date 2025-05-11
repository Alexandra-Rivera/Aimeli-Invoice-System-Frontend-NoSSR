import { TestBed } from '@angular/core/testing';

import { DestinosServiceService } from './destinos-service.service';

describe('DestinosServiceService', () => {
  let service: DestinosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
