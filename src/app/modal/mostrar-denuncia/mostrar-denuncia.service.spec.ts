import { TestBed } from '@angular/core/testing';

import { MostrarDenunciaService } from './mostrar-denuncia.service';

describe('MostrarDenunciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MostrarDenunciaService = TestBed.get(MostrarDenunciaService);
    expect(service).toBeTruthy();
  });
});
