import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeScreenshotsComponent } from './contribute-screenshots.component';

describe('ContributeScreenshotsComponent', () => {
  let component: ContributeScreenshotsComponent;
  let fixture: ComponentFixture<ContributeScreenshotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeScreenshotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeScreenshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
