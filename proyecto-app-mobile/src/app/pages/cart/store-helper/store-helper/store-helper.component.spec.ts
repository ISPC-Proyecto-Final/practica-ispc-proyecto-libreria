import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHelperComponent } from './store-helper.component';

describe('StoreHelperComponent', () => {
  let component: StoreHelperComponent;
  let fixture: ComponentFixture<StoreHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
