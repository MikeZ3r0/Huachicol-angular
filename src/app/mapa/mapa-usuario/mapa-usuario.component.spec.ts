import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaUsuarioComponent } from './mapa-usuario.component';

describe('MapaUsuarioComponent', () => {
  let component: MapaUsuarioComponent;
  let fixture: ComponentFixture<MapaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
