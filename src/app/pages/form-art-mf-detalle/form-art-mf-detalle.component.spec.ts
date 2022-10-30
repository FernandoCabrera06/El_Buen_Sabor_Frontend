import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArtMfDetalleComponent } from './form-art-mf-detalle.component';

describe('FormArtMfDetalleComponent', () => {
  let component: FormArtMfDetalleComponent;
  let fixture: ComponentFixture<FormArtMfDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArtMfDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArtMfDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
