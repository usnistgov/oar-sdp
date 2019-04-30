import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSyntaxComponent } from './search-syntax.component';

describe('SearchSyntaxComponent', () => {
  let component: SearchSyntaxComponent;
  let fixture: ComponentFixture<SearchSyntaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSyntaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSyntaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
