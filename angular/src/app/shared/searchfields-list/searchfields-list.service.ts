import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import * as rxjsop from 'rxjs/operators';
import { AppConfig, Config } from '../config-service/config.service';
import { SelectItem } from 'primeng/api';
import * as _ from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class SearchfieldsListService {
  ALL: string = 'ALL FIELDS';
  fields = new BehaviorSubject<SelectItem[]>([]);
  _fields: SelectItem[] = [];
    
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
   * Set the value of fields
   * @param fields
   */
  setFields(fields: SelectItem[]) {
      this.fields.next(fields);
  }

  /**
   * Watch the value of fields
   * @returns fields
   */
  watchFields(): Observable<any>{
      return this.fields.asObservable();
  }


  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<any> {
      return this.appConfig.getConfig().pipe(
          rxjsop.mergeMap((conf) => {
              return this.http.get(conf.RMMAPI + 'records/fields');
          }),
          rxjsop.catchError((err) => {
              console.error("Failed to download fields: " + JSON.stringify(err));
              return throwError(() => err);
          })
      );
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
    return throwError(() => errMsg);
  }

  /**
   * Get database fields for Advanced Search builder.
   * Since fields do not change very often, once we get them we keep them
   * and reuse them everytime.
   */
    getSearchFields(): Observable<SelectItem[]> {
        if(this._fields.length > 0) {
        return new Observable<SelectItem[]>(subscriber => {
            subscriber.next(this._fields);
        })
        }else{
        return new Observable<SelectItem[]>(subscriber => {
            this.get().subscribe({
                next: (res) => {
                this.setFields(res);
                this._fields = this.toFieldItems(res);
                subscriber.next(this._fields);
                subscriber.complete();
                },
                error: (error) => {
                    console.log(error);
                    // Propagate an error so listeners (e.g., results component) can show error UI
                    try { (this.fields as any).error?.(error); } catch {}
                    subscriber.error(error);
                }
            });
        });
        }
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
