import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScreenshotsComponent } from './product-screenshots.component';

describe('ProductScreenshotsComponent', () => {
  let component: ProductScreenshotsComponent;
  let fixture: ComponentFixture<ProductScreenshotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductScreenshotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScreenshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
