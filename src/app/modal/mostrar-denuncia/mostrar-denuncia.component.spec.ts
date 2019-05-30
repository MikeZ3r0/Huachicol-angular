import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDenunciaComponent } from './mostrar-denuncia.component';

describe('MostrarDenunciaComponent', () => {
  let component: MostrarDenunciaComponent;
  let fixture: ComponentFixture<MostrarDenunciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarDenunciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
