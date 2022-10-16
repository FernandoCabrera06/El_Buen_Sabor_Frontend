import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRubroArticuloComponent } from './form-rubro-articulo.component';

describe('FormRubroArticuloComponent', () => {
  let component: FormRubroArticuloComponent;
  let fixture: ComponentFixture<FormRubroArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRubroArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRubroArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
