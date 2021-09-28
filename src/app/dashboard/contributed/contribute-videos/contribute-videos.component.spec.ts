import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeVideosComponent } from './contribute-videos.component';

describe('ContributeVideosComponent', () => {
  let component: ContributeVideosComponent;
  let fixture: ComponentFixture<ContributeVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
