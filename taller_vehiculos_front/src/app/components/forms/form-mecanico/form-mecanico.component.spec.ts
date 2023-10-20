import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMecanicoComponent } from './form-mecanico.component';

describe('FormMecanicoComponent', () => {
  let component: FormMecanicoComponent;
  let fixture: ComponentFixture<FormMecanicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMecanicoComponent]
    });
    fixture = TestBed.createComponent(FormMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
