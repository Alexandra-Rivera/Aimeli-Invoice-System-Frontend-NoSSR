import { TestBed } from '@angular/core/testing';

import { ClienteServiceService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
