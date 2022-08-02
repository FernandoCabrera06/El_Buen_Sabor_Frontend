import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRubroGeneralComponent } from './form-rubro-general.component';

describe('FormRubroGeneralComponent', () => {
  let component: FormRubroGeneralComponent;
  let fixture: ComponentFixture<FormRubroGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRubroGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRubroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
