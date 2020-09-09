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
    operators: string[] = ["AND", "OR"];

    constructor(
        public searchFieldsListService: SearchfieldsListService,
        private notificationService: NotificationService) {
    }

    public watchQueries(): Observable<SDPQuery[]> {
        return this.queriesSub.asObservable();
    }

    /**
     * Advanced Search string builder 
     */
    buildSearchString(inputQuery: SDPQuery): string {
        let query = JSON.parse(JSON.stringify(inputQuery));

        let lSearchValue: string = '';
        // First of all, we need to handle duplicated field (row) name, if any
        // If there are dup keys and operator is OR, we need to combine them together, separate values by comma.
        var dupNames = this.findDuplicates(query.queryRows)

        for(let i=0; i<dupNames.length; i++){
            let firstRow = query.queryRows.find(q => q.fieldValue == dupNames[i]);
            for(let ii=0; ii<query.queryRows.length; ii++){
                if(query.queryRows[ii].fieldValue == firstRow.fieldValue && query.queryRows[ii].id != firstRow.id){
                    if(query.queryRows[ii].operator == "OR"){
                        firstRow.fieldText += "," + query.queryRows[ii].fieldText;
                        query.queryRows.splice(ii, 1);
                    }                   
                }
            }
        }

        // Processing rows
        lSearchValue = query.queryRows[0].fieldValue + '=' + query.queryRows[0].fieldText;

        for (let i = 1; i < query.queryRows.length; i++) {
            if (typeof query.queryRows[i].operator === 'undefined') {
                query.queryRows[i].operator = 'AND';
            }
            if (typeof query.queryRows[i].fieldType === 'undefined') {
                query.queryRows[i].fieldType = 'searchphrase';
            }
            if (typeof query.queryRows[i].fieldText === 'undefined') {
                query.queryRows[i].fieldText = '';
            }

            let fieldValue: string;
            fieldValue = query.queryRows[i].fieldValue;

            lSearchValue += ' ' + query.queryRows[i].operator + ' ';
            lSearchValue += query.queryRows[i].fieldValue + '=' + query.queryRows[i].fieldText;                
        }

        return lSearchValue;
    }

    /**
     * Find duplicated query rows
     * @param queryRows input query rows
     */
    findDuplicates(queryRows: QueryRow[]): string[]{
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
        this.notificationService.showSuccessWithTimeout("Queries updated.", "", 3000);
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
     * 
     * @param queryString Query string
     */
    buildQueryFromString(queryString: string, queryName?: string): SDPQuery{
        let lQueryName: string;

        //We are not going to save empty string
        if(!queryString){
            return null;
        }

        if(queryName){
            lQueryName = queryName;
            // validate query name
            if(!this.queryNameValidation(queryName, "", "ADD")){
                console.log("Name already exist!", queryName);
                alert("Query name already exist!");
                return null;
            }
        }else{
            lQueryName = "unknown";
        }

        // Assume the query string follows this pattern:
        // key=value OP key=value OP ...

        let lqString = queryString.trim();
        lqString = lqString.replace(new RegExp(' AND ', 'g'), '&AND&');
        lqString = lqString.replace(new RegExp(' OR ', 'g'), '&OR&');

        //Reserve everything in quotes
        let quotes = lqString.match(/\"(.*?)\"/g);

        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                lqString = lqString.replace(new RegExp(quotes[i].match(/\"(.*?)\"/)[1], 'g'), 'Quooooote'+i);
            }
        }
        //Trim spaces
        lqString = lqString.replace(/\s+/g, ' ');

        //Replace spaces with "&OR&"
        lqString = lqString.replace(/ /g, '&OR&');

        //Restore everything in quotes
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                lqString = lqString.replace(new RegExp('Quooooote'+i, 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
            }
        }

        let query: SDPQuery = new SDPQuery(this.nextQueryId(), lQueryName)
        let keyValue: string[];
        let row: QueryRow;

        let items = lqString.split('&');
        if(items && items.length > 0){
            for (var i = 0; i < items.length; i++) {
                keyValue = items[i].split("=");
                row = new QueryRow(this.nextRowId(query));

                // If first one is an operator, add it to the row and load next item
                // Otherwise populate the row
                if(i>0){
                    if(this.operators.indexOf(items[i])>0){
                        row.operator = items[i];
                        i++;
                        keyValue = items[i].split("=");
                    }                  
                }

                if(keyValue.length > 1){
                    row.fieldValue = keyValue[0];
                    row.fieldType = this.searchFieldsListService.getFieldType(row.fieldValue);
                    row.fieldText = keyValue[1];
                }else{
                    row.fieldValue = "searchphrase";
                    row.fieldType = this.searchFieldsListService.getFieldType(row.fieldValue);
                    row.fieldText = keyValue[0];
                }

                query.queryRows.push(JSON.parse(JSON.stringify(row)));
            }
        }

        return query;
    }

    /**
     * Parse query string, create a query object and append it to existing query list.
     * @param queryString - string from the search box
     * @param queryName - query name to be saved
     */
    public saveAdvQueryFromString(queryString: string, queryName: string) {

        let currentQueries = this.getQueries();
        let query = this.buildQueryFromString(queryString, queryName);

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
