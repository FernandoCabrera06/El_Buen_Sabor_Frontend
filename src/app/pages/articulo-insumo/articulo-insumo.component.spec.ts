import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloInsumoComponent } from './articulo-insumo.component';

describe('ArticuloInsumoComponent', () => {
  let component: ArticuloInsumoComponent;
  let fixture: ComponentFixture<ArticuloInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloInsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
