import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleManufacturadoComponent } from './detalle-manufacturado.component';

describe('DetalleManufacturadoComponent', () => {
  let component: DetalleManufacturadoComponent;
  let fixture: ComponentFixture<DetalleManufacturadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleManufacturadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleManufacturadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
