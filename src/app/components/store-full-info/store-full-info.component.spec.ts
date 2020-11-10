import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFullInfoComponent } from './store-full-info.component';

describe('StoreFullInfoComponent', () => {
  let component: StoreFullInfoComponent;
  let fixture: ComponentFixture<StoreFullInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFullInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
