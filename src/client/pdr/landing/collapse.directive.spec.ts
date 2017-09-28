import { Component, DebugElement }   from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Collaspe } from './collapse.directive';


@Component({
  template: ``
})
class TestComponent { }
export function main() {
describe('Collaspe', () => {

  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive
  let bareH2: DebugElement; // the <h2> w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ Collaspe, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(Collaspe));

    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css(''));
  });

  // color tests
  it('should have two collapsed elements', () => {
    expect(des.length).toBe(2);
  });

  it('should color 1st background "white"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('white');
  });

  });}