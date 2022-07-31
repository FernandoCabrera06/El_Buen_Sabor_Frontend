import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreElBuenSaborComponent } from './sobre-el-buen-sabor.component';

describe('SobreElBuenSaborComponent', () => {
  let component: SobreElBuenSaborComponent;
  let fixture: ComponentFixture<SobreElBuenSaborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobreElBuenSaborComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreElBuenSaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
