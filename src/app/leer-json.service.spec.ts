import { TestBed } from '@angular/core/testing';

import { LeerJSONService } from './leer-json.service';

describe('LeerJSONService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeerJSONService = TestBed.get(LeerJSONService);
    expect(service).toBeTruthy();
  });
});
