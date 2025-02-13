import { TestBed } from '@angular/core/testing';

import { CryptionService } from './cryption.service';

describe('CryptionService', () => {
  let service: CryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
