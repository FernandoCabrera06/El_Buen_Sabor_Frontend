import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArticulosInsumosComponent } from './form-articulos-insumos.component';

describe('FormArticulosInsumosComponent', () => {
  let component: FormArticulosInsumosComponent;
  let fixture: ComponentFixture<FormArticulosInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArticulosInsumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArticulosInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
