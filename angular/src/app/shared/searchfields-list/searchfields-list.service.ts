import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig, Config } from '../config-service/config-service.service';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SearchfieldsListService {
  confValues: Config;
  private RMMAPIURL: string;
  ALL: string = 'ALL FIELDS';

  /**
   * Creates a new FieldsListService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient,
    private appConfig: AppConfig) {
      this.confValues = this.appConfig.getConfig();
      this.RMMAPIURL = this.confValues.RMMAPI;
    }

    ngOnInit(): void {

    }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<any> {
   return this.http.get(this.RMMAPIURL + 'records/fields');
  }
  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  /**
   * Get database fields for Advanced Search builder
   */
  getSearchFields(): Observable<SelectItem[]> {
    return new Observable<SelectItem[]>(subscriber => {
        this.get().subscribe(
            (res) => {
                let fields: SelectItem[] = this.toFieldItems(res);
                subscriber.next(fields);
                subscriber.complete();
            },
            (error) => {
                console.log(error);
                subscriber.next(error);
                subscriber.complete();
            }
        );
    });
  }

    /**
     * Advanced Search fields dropdown
     */
    toFieldItems(fields: any[]): SelectItem[] {
        // let items: SelectItem[] = [];
        // items.push({ label: this.ALL, value: 'searchphrase' });
        let fieldItems: SelectItem[] = [];
        for (let field of fields) {
        if (_.includes(field.tags, 'searchable')) {
            fieldItems.push({ label: field.label, value: field.name.replace('component.', 'components.') });
        }
        };
        fieldItems = _.sortBy(fieldItems, ['label', 'value']);
        // fieldItems.unshift({ label: this.ALL, value: 'searchphrase' });

        return fieldItems;
    }
}
