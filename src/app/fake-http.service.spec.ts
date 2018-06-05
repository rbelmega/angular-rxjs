import { TestBed, inject } from '@angular/core/testing';

import { FakeHTTPService } from './fake-http.service';

describe('FakeHTTPService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeHTTPService],
    });
  });

  it('should be created', inject(
    [FakeHTTPService],
    (service: FakeHTTPService) => {
      expect(service).toBeTruthy();
    }
  ));
});
