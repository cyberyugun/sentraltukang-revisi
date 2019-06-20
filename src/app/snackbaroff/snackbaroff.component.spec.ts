import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbaroffComponent } from './snackbaroff.component';

describe('SnackbaroffComponent', () => {
  let component: SnackbaroffComponent;
  let fixture: ComponentFixture<SnackbaroffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbaroffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbaroffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
