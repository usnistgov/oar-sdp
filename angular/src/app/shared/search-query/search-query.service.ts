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
    operators: string[] = ["AND", "OR", "NOT"];

    constructor(
        public searchFieldsListService: SearchfieldsListService,
        private notificationService: NotificationService) {
    }

    public watchQueries(): Observable<SDPQuery[]> {
        return this.queriesSub.asObservable();
    }

    /**
     * Build search string from a given query object for backend
     * @param inputQuery 
     */
    buildSearchString(inputQuery: SDPQuery): string {
        let query = JSON.parse(JSON.stringify(inputQuery));
        let lSearchValue: string = '';
        //Handle freetext search
        if(!this.isEmpty(inputQuery.freeText)){
            lSearchValue = inputQuery.freeText.trim() + " ";
        }

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
        for (let i = 0; i < query.queryRows.length; i++) {
            if (typeof query.queryRows[i].operator === 'undefined') {
                query.queryRows[i].operator = 'AND';
            }

            let fieldValue: string;
            fieldValue = query.queryRows[i].fieldValue;

            //Skip operator for the first row
            if(i > 0)
                lSearchValue += ' ' + query.queryRows[i].operator + ' ';

            //If user didn't provide search value, ignore the row
            if(!this.isEmpty(query.queryRows[i].fieldText) && !this.isEmpty(query.queryRows[i].fieldType)){
                if(query.queryRows[i].fieldText.trim().indexOf(" ") > 0) 
                    query.queryRows[i].fieldText = '"' + query.queryRows[i].fieldText.trim() + '"';

                lSearchValue += query.queryRows[i].fieldValue + '=' + query.queryRows[i].fieldText; 
            }
        }
        return lSearchValue;
    }

    /**
     * Check if a string object is empty
     * @param stringValue 
     */
    isEmpty(stringValue: string){
        return stringValue == null || stringValue == undefined || stringValue.trim() == '';
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
    buildQueryFromString(queryString: string, queryName?: string, fields?: SelectItem[]): SDPQuery{
        //Trim spaces
        queryString = queryString.replace(/\s+/g, ' ');

        let lQueryName: string;
        //We are not going to save empty string
        if(!queryString){
            queryString = "";
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

        //Reserve everything in quotes
        let quotes = queryString.match(/\"(.*?)\"/g);
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i] != '""')
                queryString = queryString.replace(new RegExp(quotes[i].match(/\"(.*?)\"/)[1], 'g'), 'Quooooote'+i);
            }
        }

        // First of all we need to put all free text search phrases together
        let lqStringArray = queryString.trim().split(" ");

        let lFreeTextSearch: string = '';
        let lKeyValuePair: string = ''; 

        for(let i = 0; i < lqStringArray.length; i++){
            //If the item right before the freetext is an operator, drop it. If it's an operator AND, display a warning
            if(this.operators.indexOf(lqStringArray[i].trim())>-1 && i < lqStringArray.length-1 && lqStringArray[i+1].indexOf("=") < 0){
                if(lqStringArray[i].trim() == "AND"){
                    console.log('Operator AND cannot be in front of a freetext phrase.')
                }
            }else{
                if(lqStringArray[i].indexOf("=") < 0 && this.operators.indexOf(lqStringArray[i].trim()) < 0){
                    lFreeTextSearch += lqStringArray[i].trim() + " ";
                }else{
                    //If this is not the first item and no operator right before this key-value pair, add a AND operator
                    if(i>0 && lqStringArray[i].indexOf("=")>-1 && this.operators.indexOf(lqStringArray[i-1].trim()) < 0){                        
                        lKeyValuePair += "AND " + lqStringArray[i].trim() + " ";
                    }else{
                        lKeyValuePair += lqStringArray[i].trim() + " ";
                    }
                }
            }
        }

        //Restore everything in quotes
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i] != '""'){
                    lKeyValuePair = lKeyValuePair.replace(new RegExp('Quooooote'+i, 'g'), quotes[i].match(/\"(.*?)\"/)[1]);

                    lFreeTextSearch = lFreeTextSearch.replace(new RegExp('Quooooote'+i, 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
                }
            }
        }

        let query: SDPQuery = new SDPQuery(this.nextQueryId(), lQueryName);
        query.freeText = lFreeTextSearch.trim();

        // Assume the query string follows this pattern:
        // key=value OP key=value OP ...

        if(!this.isEmpty(lKeyValuePair)){

            lKeyValuePair = lKeyValuePair.replace(new RegExp(' AND ', 'g'), '&AND&');
            lKeyValuePair = lKeyValuePair.replace(new RegExp('AND ', 'g'), 'AND&');
            lKeyValuePair = lKeyValuePair.replace(new RegExp(' OR ', 'g'), '&OR&');
            lKeyValuePair = lKeyValuePair.replace(new RegExp('OR ', 'g'), 'OR&');

            //Trim spaces
            lKeyValuePair = lKeyValuePair.replace(/\s+/g, ' ').trim();

            //Replace spaces with "&OR&"
            // lKeyValuePair = lKeyValuePair.replace(/ /g, '&OR&');

            let keyValue: string[];
            let row: QueryRow;
            let items = lKeyValuePair.split('&');

            // If first item is an operator, and it's an "OR", we need to display a warning
            if(this.operators.indexOf(items[0]) > -1){
                //set warning message here. Or this validation should be done before call this function...

                //Remove this operator
                items.shift();
            }

            if(items && items.length > 0 && items[0].trim()!=""){
                for (var i = 0; i < items.length; i++) {
                    keyValue = items[i].split("=");
                    row = new QueryRow(this.nextRowId(query));

                    // If first one is an operator, add it to the row and load next item
                    // Otherwise populate the row
                    if(this.operators.indexOf(items[i]) > -1)

                    if(keyValue.length == 1){
                        if(this.operators.indexOf(items[i])>=0){
                            row.operator = items[i];
                            if(i == items.length-1) break;
                            else{
                                i++;
                                keyValue = items[i].split("=");
                            }
                        }                  
                    }

                    if(keyValue.length == 2){
                        row.fieldValue = keyValue[0];
                        row.fieldType = this.getFieldType(row.fieldValue, fields);
                        row.fieldText = keyValue[1].replace(/['"]+/g, '').trim(); //Strip off quotes
                        query.queryRows.push(JSON.parse(JSON.stringify(row)));
                    }
                }
            }
        }

        console.log('query', query);
        return query;
    }

    /**
     * Parse query string, create a query object and append it to existing query list.
     * @param queryString - string from the search box
     * @param queryName - query name to be saved
     */
    public saveAdvQueryFromString(queryString: string, queryName: string, fields: SelectItem[]) {

        let currentQueries = this.getQueries();
        let query = this.buildQueryFromString(queryString, queryName, fields);

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

    /**
     * Behavior subject to remotely set the search value. 
     */
    private _remoteShowExamples : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public _watchShowExamples(subscriber){
        this._remoteShowExamples.subscribe(subscriber);
    }

    public setShowExamples(showExamples: boolean = false) {
        this._remoteShowExamples.next(showExamples);
    }

    /**
     * Look up field type
     * @param fieldValue - input field value
     */
    getFieldType(fieldValue: string, fields?: SelectItem[]){
        if(fields == null || fields == undefined){
            return "";
        }else{
            let field = fields.filter(field => field.value == fieldValue);
            if(field && field.length>0) return field[0].label;
            else return "";
        }

    }

    /**
     * Query string validation. If error occurs, an error message will be returned. Otherwise return empty string.
     * @param queryString input query string
     */
    validateQueryString(queryString: string){
        let queryStringErrorMessage = "";
        let lQueryString: string = "";
        let errorCount: number = 0;

        //Trim spaces
        queryString = queryString.replace(/\s+/g, ' ');

        if(!queryString){
            return "";
        }

        //Reserve everything in quotes
        let quotes = queryString.match(/\"(.*?)\"/g);
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i] != '""')
                queryString = queryString.replace(new RegExp(quotes[i].match(/\"(.*?)\"/)[1], 'g'), 'Quooooote'+i);
            }
        }

        // First of all we need to put all free text search phrases together
        let lqStrArray:string[] = queryString.trim().split(" ");

        for(let i = 0; i < lqStrArray.length; i++){
            //If the item right before the freetext is an operator, or if an operator OR is between 
            // freetext and key-value pair, mark it and display warning
            if(this.operators.indexOf(lqStrArray[i].trim()) >= 0){
                if(i == lqStrArray.length-1){
                    lQueryString += ' <mark> ' + lqStrArray[i].trim() + ' </mark> ';
                    errorCount++;
                }else if(i < lqStrArray.length-1 && lqStrArray[i+1].indexOf("=") < 0){
                    if(lqStrArray[i].trim() == "AND"){
                        //Display warning here
                        lQueryString += ' <mark> AND </mark> ';
                        errorCount++;
                        console.log('Operator AND cannot be in front of a freetext phrase.');
                    }
                }else if(i > 0 && i < lqStrArray.length-1 && lqStrArray[i-1].indexOf("=") < 0 && lqStrArray[i+1].indexOf("=") > -1 && lqStrArray[i].trim() == "OR"){
                    lQueryString += "<mark> OR </mark>";
                    errorCount++;
                    console.log('Operator OR cannot be between freetext phrase and a key value pair:');
                }else{
                    lQueryString += lqStrArray[i] + " ";
                }
            }else{
                lQueryString += lqStrArray[i] + " ";
            }
        }

        //Restore everything in quotes
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i] != '""'){
                    lQueryString = lQueryString.replace(new RegExp('Quooooote'+i, 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
                }
            }
        }      
        
        if(errorCount == 1)
            queryStringErrorMessage = 'Operator has been ignored: <i>'+lQueryString+'</i>. Click on Show Examples for more details';

        if(errorCount > 1)
            queryStringErrorMessage = 'Operators have been ignored: <i>'+lQueryString+'</i>. Click on Show Examples for more details';

        return queryStringErrorMessage;
    }
}
