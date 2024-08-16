import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopMenuBarComponent } from './top-menu-bar.component';

describe('TopMenuBarComponent', () => {
  let component: TopMenuBarComponent;
  let fixture: ComponentFixture<TopMenuBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
