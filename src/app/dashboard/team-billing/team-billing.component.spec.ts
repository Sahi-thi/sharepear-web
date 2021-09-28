import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBillingComponent } from './team-billing.component';

describe('TeamBillingComponent', () => {
  let component: TeamBillingComponent;
  let fixture: ComponentFixture<TeamBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
