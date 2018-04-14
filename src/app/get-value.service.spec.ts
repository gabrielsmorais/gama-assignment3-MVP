import { TestBed, inject } from '@angular/core/testing';

import { GetValueService } from './get-value.service';

describe('GetValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetValueService]
    });
  });

  it('should be created', inject([GetValueService], (service: GetValueService) => {
    expect(service).toBeTruthy();
  }));
});
