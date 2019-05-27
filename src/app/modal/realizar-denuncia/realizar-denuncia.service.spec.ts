import { TestBed } from '@angular/core/testing';

import { RealizarDenunciaService } from './realizar-denuncia.service';

describe('RealizarDenunciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealizarDenunciaService = TestBed.get(RealizarDenunciaService);
    expect(service).toBeTruthy();
  });
});
