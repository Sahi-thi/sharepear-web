import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContributeItemsComponent } from './all-contribute-items.component';

describe('AllContributeItemsComponent', () => {
  let component: AllContributeItemsComponent;
  let fixture: ComponentFixture<AllContributeItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContributeItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContributeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
