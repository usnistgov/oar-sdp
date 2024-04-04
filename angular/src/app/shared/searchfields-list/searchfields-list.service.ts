import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import * as rxjsop from 'rxjs/operators';
import { AppConfig, Config } from '../config-service/config.service';
import { SelectItem } from 'primeng/api';
import * as _ from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class SearchfieldsListService {
  ALL: string = 'ALL FIELDS';
  fields: BehaviorSubject<SelectItem[]> = new BehaviorSubject<SelectItem[]>([] as SelectItem[]);

  /**
   * Creates a new FieldsListService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient,
              private appConfig: AppConfig)
  {  }

  ngOnInit(): void {

  }

    /**
     * Watch total items (search result)
     */
    public watchFields(subscriber) {
        this.fields.subscribe(subscriber);
    }

    /**
     * Set total items (search result)
     * @param page 
     */
    setFields(fields: SelectItem[]) {
        this.fields.next(fields);
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
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
     */
    get(url): Observable<any> {
        return this.http.get(url);
    }

    /**
     * Get database fields for Advanced Search builder
     */
    getSearchFields() {
        this.appConfig.getConfig().subscribe({
            next: (conf) => {
                this.get(conf.RMMAPI + 'records/fields').subscribe({
                    next: (res) => {
                        this.setFields(this.toFieldItems(res));
                    },
                    error: (err) => {
                        console.error(err);
                        //display error message on screen...
                    }
                })
            },
            error: (err) => {
                console.error(err);
                //display error message on screen...
            }
        })
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
                let dup = false;
                //For some reason, the filter function does not work for fields. Have to use this loop...
                for(let item of fieldItems){
                    if(item.label == field.label && item.value == field.name.replace('component.', 'components.')){
                        dup = true;
                        break;
                    }
                }

                if(!dup){
                    fieldItems.push({ label: field.label, value: field.name.replace('component.', 'components.') });
                }
            }
        };
        fieldItems = _.sortBy(fieldItems, ['label', 'value']);

        return fieldItems;
    }
}
