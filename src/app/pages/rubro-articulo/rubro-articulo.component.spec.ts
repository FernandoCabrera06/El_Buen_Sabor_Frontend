import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroArticuloComponent } from './rubro-articulo.component';

describe('RubroArticuloComponent', () => {
  let component: RubroArticuloComponent;
  let fixture: ComponentFixture<RubroArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubroArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
