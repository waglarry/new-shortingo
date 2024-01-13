import { TestBed } from '@angular/core/testing';

import { ShortenedUrlsService } from './shortened-urls.service';

describe('ShortenedUrlsService', () => {
  let service: ShortenedUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortenedUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
