import { TestBed } from '@angular/core/testing';

import { HammerConfigService } from './hammer-config.service';

describe('HammerConfigService', () => {
  let service: HammerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HammerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
