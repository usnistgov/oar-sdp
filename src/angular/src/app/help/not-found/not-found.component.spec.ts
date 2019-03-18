import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPageNotFoundComponent } from './not-found.component';

describe('HelpPageNotFoundComponent', () => {
  let component: HelpPageNotFoundComponent;
  let fixture: ComponentFixture<HelpPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
