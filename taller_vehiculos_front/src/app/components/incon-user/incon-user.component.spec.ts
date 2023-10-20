import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconUserComponent } from './incon-user.component';

describe('InconUserComponent', () => {
  let component: InconUserComponent;
  let fixture: ComponentFixture<InconUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InconUserComponent]
    });
    fixture = TestBed.createComponent(InconUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
