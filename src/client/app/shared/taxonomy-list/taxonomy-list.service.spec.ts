import { provide, ReflectiveInjector } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { BaseRequestOptions, ConnectionBackend, Http, HTTP_PROVIDERS, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { TaxonomyListService } from './taxonomy-list.service';

export function main() {
  describe('TaxonomyList Service', () => {
    let nameListService: NameListService;
    let backend: MockBackend;
    let initialResponse: any;
    let providerArr: any[];

    beforeEach(() => {
      providerArr = [disableDeprecatedForms(), provideForms()];

      let injector = ReflectiveInjector.resolveAndCreate([
        disableDeprecatedForms(),
        provideForms(),
        HTTP_PROVIDERS,
        NameListService,
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }),
      ]);
      nameListService = injector.get(NameListService);
      backend = injector.get(MockBackend);

      let connection: any;
      backend.connections.subscribe((c: any) => connection = c);
      initialResponse = nameListService.get();
      connection.mockRespond(new Response(new ResponseOptions({ body: '[{"name":"Chemistry1"},{"name":"Physics"}]'})));
    });

    it('should return an Observable when get called', () => {
      expect(initialResponse).toEqual(jasmine.any(Observable));
    });

    it('should resolve to list of names when get called', () => {
      let taxonomies: any;
      initialResponse.subscribe((data: any) => taxonomies = data);
      expect(taxonomies).toEqual([{"name":"Chemistry1"},{"name":"Physics"}]);
    });
  });
}
