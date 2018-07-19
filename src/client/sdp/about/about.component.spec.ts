import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { AboutModule } from './about.module';

export function main() {
  describe('About component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [AboutModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(aboutDOMEl.querySelectorAll('label')[0].textContent.trim()).toEqual(
            'About NIST Data'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-about></sdp-about>'
})
class TestComponent {}
