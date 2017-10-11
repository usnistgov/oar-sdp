import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { AdvSearchModule } from './adv_search.module';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { RouterTestingModule } from '@angular/router/testing';

export function main() {
  describe('Advance Search component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [AdvSearchModule,HttpModule,RouterTestingModule]
      });
    });
  });
}

@Component({
  template: '<sdp-advsearch></sdp-advsearch>',
  selector: 'test-cmp',
})
class TestComponent {}
