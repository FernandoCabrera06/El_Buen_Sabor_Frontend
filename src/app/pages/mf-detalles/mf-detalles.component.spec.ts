import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfDetallesComponent } from './mf-detalles.component';

describe('MfDetallesComponent', () => {
  let component: MfDetallesComponent;
  let fixture: ComponentFixture<MfDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
