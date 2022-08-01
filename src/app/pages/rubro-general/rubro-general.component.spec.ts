import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroGeneralComponent } from './rubro-general.component';

describe('RubroGeneralComponent', () => {
  let component: RubroGeneralComponent;
  let fixture: ComponentFixture<RubroGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubroGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
