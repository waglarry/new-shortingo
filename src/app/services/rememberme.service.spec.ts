import { TestBed } from '@angular/core/testing';

import { RemembermeService } from './rememberme.service';

describe('RemembermeService', () => {
  let service: RemembermeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemembermeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
