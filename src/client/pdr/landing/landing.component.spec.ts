import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LandingPanelComponent } from './landing.component';

describe('AppComponent', () => {
  let component: LandingPanelComponent;
  let fixture: ComponentFixture<LandingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });
});