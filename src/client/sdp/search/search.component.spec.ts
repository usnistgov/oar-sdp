import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';
import { SearchModule } from './search.module';
import { RouterTestingModule } from '@angular/router/testing';


export function main() {
  describe('Search component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [SearchModule,HttpModule,RouterTestingModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let aboutDOMEl = fixture.debugElement.children[0].nativeElement;

        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-search></sdp-search>'

})
class TestComponent {}
