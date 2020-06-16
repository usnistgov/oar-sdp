import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AdvSearchService implements OnInit {

    constructor() { }

    ngOnInit() {
        this._remoteSearch.next(null);
    }

    /**
     * Behavior subject to remotely start the search function. This is used when user clicks on a query
     * at top right query list.
     */
    private _remoteSearch : BehaviorSubject<string> = new BehaviorSubject<string>('');
    _watchRemoteSearch() {
        return this._remoteSearch;
    }

    /**
     * Trigger the search function
     */
    public startRemoteSearch(queryValue) : void {
        console.log('init start', queryValue);
        this._remoteSearch.next(queryValue);
    }
}
