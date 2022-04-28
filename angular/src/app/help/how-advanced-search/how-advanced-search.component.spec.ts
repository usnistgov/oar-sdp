import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HowAdvancedSearchComponent } from './how-advanced-search.component';

describe('HowAdvancedSearchComponent', () => {
  let component: HowAdvancedSearchComponent;
  let fixture: ComponentFixture<HowAdvancedSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HowAdvancedSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowAdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
