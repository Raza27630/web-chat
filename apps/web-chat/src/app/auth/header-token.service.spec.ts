import { TestBed } from '@angular/core/testing';

import { HeaderTokenService } from './header-token.service';

describe('HeaderTokenService', () => {
  let service: HeaderTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
