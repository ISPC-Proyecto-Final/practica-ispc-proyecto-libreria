import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookNotFoundComponent } from './search-book-not-found.component';

describe('SearchBookNotFoundComponent', () => {
  let component: SearchBookNotFoundComponent;
  let fixture: ComponentFixture<SearchBookNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBookNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBookNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
