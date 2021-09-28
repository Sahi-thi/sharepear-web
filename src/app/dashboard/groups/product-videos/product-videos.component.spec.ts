import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVideosComponent } from './product-videos.component';

describe('ProductVideosComponent', () => {
  let component: ProductVideosComponent;
  let fixture: ComponentFixture<ProductVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
