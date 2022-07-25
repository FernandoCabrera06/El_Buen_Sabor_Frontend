import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormManufacturadosComponent } from './form-manufacturados.component';

describe('FormManufacturadosComponent', () => {
  let component: FormManufacturadosComponent;
  let fixture: ComponentFixture<FormManufacturadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormManufacturadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
