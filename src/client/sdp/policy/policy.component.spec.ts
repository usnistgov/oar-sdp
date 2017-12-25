import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { PolicyModule } from './policy.module';

export function main() {
  describe('Policy component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PolicyModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(aboutDOMEl.querySelectorAll('label')[0].textContent).toEqual(
            ' Policy'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-policy></sdp-policy>'
})
class TestComponent {}
