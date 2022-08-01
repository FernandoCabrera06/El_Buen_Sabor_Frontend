import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecetaManufacturadoComponent } from './detalle-receta-manufacturado.component';

describe('DetalleRecetaManufacturadoComponent', () => {
  let component: DetalleRecetaManufacturadoComponent;
  let fixture: ComponentFixture<DetalleRecetaManufacturadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleRecetaManufacturadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRecetaManufacturadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
