import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturadosComponent } from './manufacturados.component';

describe('ManufacturadosComponent', () => {
  let component: ManufacturadosComponent;
  let fixture: ComponentFixture<ManufacturadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
