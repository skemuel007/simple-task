import { TestBed } from '@angular/core/testing';

import { AuthenictationService } from './authenictation.service';

describe('AuthenictationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenictationService = TestBed.get(AuthenictationService);
    expect(service).toBeTruthy();
  });
});
