import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AdvSearchService implements OnInit {

    constructor() { }

    ngOnInit() {
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
    public remoteStartSearch(queryValue) : void {
        this._remoteSearch.next(queryValue);
    }
}
