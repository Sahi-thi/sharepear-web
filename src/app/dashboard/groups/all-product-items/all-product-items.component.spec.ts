import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductItemsComponent } from './all-product-items.component';

describe('AllProductItemsComponent', () => {
  let component: AllProductItemsComponent;
  let fixture: ComponentFixture<AllProductItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
