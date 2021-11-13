import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsuccessComponent } from './requestsuccess.component';

describe('RequestsuccessComponent', () => {
  let component: RequestsuccessComponent;
  let fixture: ComponentFixture<RequestsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
