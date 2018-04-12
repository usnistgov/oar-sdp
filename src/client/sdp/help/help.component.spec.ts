import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { HelpModule } from './help.module';

export function main() {
  describe('Help component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [HelpModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(aboutDOMEl.querySelectorAll('label')[0].textContent).toEqual(
            ' Help'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-help></sdp-help>'
})
class TestComponent {}
