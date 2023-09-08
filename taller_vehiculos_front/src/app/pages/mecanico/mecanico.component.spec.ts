import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicoComponent } from './mecanico.component';

describe('MecanicoComponent', () => {
  let component: MecanicoComponent;
  let fixture: ComponentFixture<MecanicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MecanicoComponent]
    });
    fixture = TestBed.createComponent(MecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
