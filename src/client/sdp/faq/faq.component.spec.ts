import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { FaqModule } from './faq.module';

export function main() {
  describe('FAQ component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [FaqModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(aboutDOMEl.querySelectorAll('label')[0].textContent).toEqual(
            ' FAQ'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-faq></sdp-faq>'
})
class TestComponent {}
