import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import {ApiModule} from "./api.module";

export function main() {
  describe('API component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ApiModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(aboutDOMEl.querySelectorAll('label')[0].textContent).toEqual(
            ' APIs'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-api></sdp-api>'
})
class TestComponent {}
