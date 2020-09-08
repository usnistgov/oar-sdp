import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs/Subject';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable } from 'rxjs';
import * as _ from 'lodash';
import { SelectItem, TreeNode, TreeModule } from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';
import { SDPQuery, QueryRow } from './query';
import { SearchfieldsListService } from '../../shared/searchfields-list/index';
import { NotificationService } from '../../shared/notification-service/notification.service';

/**
 * The cart service provides an way to store the cart in local store.
 **/
@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {
    queriesSub= new BehaviorSubject<SDPQuery[]>([]);
    addCartSpinnerSub = new BehaviorSubject<boolean>(false);
    addAllCartSpinnerSub = new BehaviorSubject<boolean>(false);
    displayQuerySub = new BehaviorSubject<boolean>(false);
    displayAdvQuerySub = new BehaviorSubject<boolean>(false);
    cartSize: number ;
    querySize: number ;
    advQuerySize: number ;
    showAddCartSpinner : boolean = false;
    showAddAllCartSpinner : boolean = false;
    displayCart : boolean = false;
    private _storage = localStorage;
    fields: SelectItem[];

    constructor(
        public searchFieldsListService: SearchfieldsListService,
        private notificationService: NotificationService) {
    }

    public watchQueries(): Observable<SDPQuery[]> {
        return this.queriesSub.asObservable();
    }

    /**
     * Advanced Search builder string
     */
    buildSearchString(query: SDPQuery) {
        let lSearchValue: string = '';
        // First of all, we need to handle duplicated field (row) name, if any

        var dupNames = this.findDuplicates(query.queryRows)
        var uniqRows: QueryRow[] = [];
        let uniqQuerryRows: QueryRow[] = JSON.parse(JSON.stringify(query.queryRows));

        for(let i=0; i<dupNames.length; i++){
            uniqQuerryRows = uniqQuerryRows.filter(q => q.fieldValue != dupNames[i]);

            var dups = query.queryRows.filter(q => q.fieldValue === dupNames[i])
            uniqRows.push(dups[0]);
            for(let j=1; j<dups.length; j++){
                if(dups[j].operator == "OR"){
                    uniqRows[0].fieldText += "," + dups[j].fieldText;
                }else{
                    uniqRows.push(dups[j]);
                }
            }
        }

        for(let k=0; k<uniqRows.length; k++)
            uniqQuerryRows.push(uniqRows[k]);

        query.queryRows = uniqQuerryRows;
        console.log('uniqQuerryRows', uniqQuerryRows);

        // Processing rows
        for (let i = 0; i < query.queryRows.length; i++) {
            if (typeof query.queryRows[i].operator === 'undefined') {
                query.queryRows[i].operator = 'AND';
            }
            if (typeof query.queryRows[i].fieldType === 'undefined' || query.queryRows[i].fieldType === 'All') {
                query.queryRows[i].fieldType = 'searchphrase';
            }
            if (typeof query.queryRows[i].fieldText === 'undefined') {
                query.queryRows[i].fieldText = '';
            }

            let fieldValue: string;
            fieldValue = query.queryRows[i].fieldValue;

            lSearchValue += query.queryRows[i].fieldValue + '=' + query.queryRows[i].fieldText;
            if(i < query.queryRows.length - 1)
                lSearchValue += ' ' + query.queryRows[i].operator + ' ';
        }

        return lSearchValue;
    }

    /**
     * Find duplicated query rows
     * @param queryRows input query rows
     */
    findDuplicates(queryRows: QueryRow[]): string[]{
        console.log('queryRows', queryRows);
        var uniq = queryRows
        .map((queryRow) => {
          return {
            count: 1,
            fieldValue: queryRow.fieldValue
          }
        })
        .reduce((a, b) => {
          a[b.fieldValue] = (a[b.fieldValue] || 0) + b.count
          return a
        }, {})

      var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
      return duplicates;
    }

    /**
     * Save queries to local storage and broadcast so header bar can update.
     * @param qureies - queries to save to local storage
     */
    saveQueries(qureies: SDPQuery[]){
        this._storage.setItem('queries',JSON.stringify(qureies));
        this.notificationService.showSuccessWithTimeout("Queries saved.", "", 3000);
        this.queriesSub.next(qureies);
    }

    /**
     * Get queries from local storage
     */
    getQueries(): SDPQuery[]{
        let queriesAsObject = JSON.parse(this._storage.getItem('queries'));
        return queriesAsObject == null? [] : queriesAsObject as SDPQuery[];
    }

    /**
     * Parse query string, create a query object and append it to existing query list.
     * @param queryString - string from the search box
     * @param queryName - query name to be saved
     */
    public saveAdvQueryFromString(queryString: string, queryName: string) : SDPQuery[]{
        //We are not going to save empty string
        if(!queryString){
            return null;
        }

        let currentQueries = this.getQueries();

        // validate query name
        if(!this.queryNameValidation(queryName, "", "ADD")){
            console.log("Name already exist!", queryName);
            alert("Query name already exist!");
            return null;
        }
 
        // Assume the query string follows this pattern:
        // key=value OP key=value OP ...

        let lqString = queryString;
        lqString = lqString.replace(new RegExp(' AND ', 'g'), '&AND&');
        lqString = lqString.replace(new RegExp(' OR ', 'g'), '&OR&');
        lqString = lqString.replace(new RegExp(' NOT ', 'g'), '&NOT&');

        let query: SDPQuery = new SDPQuery(this.nextQueryId(), queryName)
        let keyValue: string[];
        let row: QueryRow;

        let items = lqString.split('&');
        if(items && items.length > 0){
            for (var i = 0; i < items.length; i=i+2) {
                keyValue = items[i].split("=");
                row = new QueryRow(this.nextRowId(query));
                if(keyValue.length > 1){
                    row.fieldValue = keyValue[0];
                    row.fieldType = this.searchFieldsListService.getFieldType(row.fieldValue);
                    row.fieldText = keyValue[1];
                }else{
                    row.fieldValue = "All";
                    row.fieldType = this.searchFieldsListService.getFieldType(row.fieldValue);
                    row.fieldText = keyValue[0];
                }
                
                // Check for operator
                if(items[i+1]){
                    row.operator = items[i+1];
                }
                query.queryRows.push(JSON.parse(JSON.stringify(row)));
            }
        }

        currentQueries.push(JSON.parse(JSON.stringify(query)));
        this.saveQueries(currentQueries);
    }

    /**
     * Query name field validation
     * 1. This field is required
     * 2. Query name should be unique
     * @param queryName 
     * @param remote - if this is a remote save, treat it the same as add
     */
    queryNameValidation(queryName: string, prevQueryName: string, mode: string = "ADD"){
        let validated: boolean = true;
        let currentQueries = this.getQueries();
        //Empty query name will be treated as valid name here
        if (_.isEmpty(queryName)) {
            validated = true;
        } else {
            if (mode == "EDIT") {
                if(queryName != prevQueryName){
                    for(let i = 0; i < currentQueries.length; i++){
                        if(currentQueries[i].queryName == queryName)
                            validated = false;
                    }
                }
            }
            
            if (mode == "ADD"){
                for(let i = 0; i < currentQueries.length; i++){
                    if(currentQueries[i].queryName == queryName){
                        validated = false;
                    }
                }
            }
        }

        return validated;
    }

    /**
     * Return next unique query id
     */
    nextQueryId() {
        let currentQueries = this.getQueries();
        return Math.max.apply(Math, currentQueries.map(function(o) { return o.id; })) + 1;
    }

    /**
     * Return next unique row id
     * @param query - given query
     */
    nextRowId(query: SDPQuery) {
        let id = Math.max.apply(Math, query.queryRows.map(function(o) { return o.id; })) + 1;
        if(id == null) return 1;
        else return id;
    }
}
