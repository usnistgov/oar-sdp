import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { HomeModule } from './home.module';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

export function main() {
  describe('Home component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [HomeModule,HttpModule,RouterTestingModule]
      });
    });
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sdp-home></sdp-home>'
})
class TestComponent {}
