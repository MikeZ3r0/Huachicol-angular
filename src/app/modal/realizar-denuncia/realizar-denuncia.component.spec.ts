import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarDenunciaComponent } from './realizar-denuncia.component';

describe('RealizarDenunciaComponent', () => {
  let component: RealizarDenunciaComponent;
  let fixture: ComponentFixture<RealizarDenunciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarDenunciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
