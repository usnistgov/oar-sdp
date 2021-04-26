import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs/Subject';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable } from 'rxjs';
import * as _ from 'lodash';
import { SelectItem, TreeNode, TreeModule } from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';
import { SDPQuery, QueryRow, CurrentQueryInfo } from './query';
import { SearchfieldsListService } from '../../shared/searchfields-list/index';
import { NotificationService } from '../../shared/notification-service/notification.service';

export class queryStrings {
    freeTextString: string;
    keyValuePairString: string;
    parseErrorMessage: string;

    constructor(){
        this.freeTextString = "";
        this.keyValuePairString = "";
        this.parseErrorMessage = "";
    }
}

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
    CURRENT_QUERY_INFO: string = "current_query_info";

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

        // Processing rows
        for (let i = 0; i < query.queryRows.length; i++) {
            if (typeof query.queryRows[i].operator === 'undefined') {
                query.queryRows[i].operator = 'AND';
            }

            //Skip operator for the first row
            if(i > 0)
                lSearchValue += ' ' + query.queryRows[i].operator + ' ';

            // Only add the row that has key and value
            if(!this.isEmpty(query.queryRows[i].fieldText) && !this.isEmpty(query.queryRows[i].fieldValue)){
                // If user forgot to put quotes around phrases, add quotes
                let items = query.queryRows[i].fieldText.split(',');
                let lFieldText: string = "";
                let count = 0;
                for(let item of items){
                    if(count > 0)
                        lFieldText += ',';
                    if(item.trim().indexOf(' ') > 0 && item.trim().indexOf('"') < 0){
                        lFieldText += '"' + item.trim() + '"';
                    }else{
                        lFieldText += item.trim();
                    }

                    count++;
                }

                lSearchValue += query.queryRows[i].fieldValue + '=' + lFieldText; 
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
    saveQueries(queries: SDPQuery[]){
        let lQueries: SDPQuery[] = [];

        //Remove any null query
        for(let query of queries){
            if(query != null && query != undefined){
                lQueries.push(query);
            }
        }

        if(lQueries != null && lQueries != undefined){
            this._storage.setItem('queries',JSON.stringify(queries));
            this.notificationService.showSuccessWithTimeout("Queries updated.", "", 3000);
            this.queriesSub.next(queries);
        }
    }

    saveCurrentQueryInfo(queryInfo: CurrentQueryInfo){
        this._storage.setItem(this.CURRENT_QUERY_INFO,JSON.stringify(queryInfo));
    }


    getCurrentQueryInfo(): CurrentQueryInfo {
        let queryAsObject: CurrentQueryInfo = JSON.parse(this._storage.getItem(this.CURRENT_QUERY_INFO));

        if(_.isEmpty(queryAsObject)){
            queryAsObject = new CurrentQueryInfo();
        }

        return queryAsObject;
    }

    /**
     * Save current query to local storage
     * @param query current query
     */
    saveCurrentQuery(query: SDPQuery){
        let queryAsObject: CurrentQueryInfo = new CurrentQueryInfo(query, -1, false);
        this._storage.setItem(this.CURRENT_QUERY_INFO,JSON.stringify(queryAsObject));
    }

    /**
     * Get current query from local storage. If nothing in local storage, return an empty query object. 
     */
    getCurrentQuery(): SDPQuery {
        let queryAsObject: CurrentQueryInfo = this.getCurrentQueryInfo();
        return queryAsObject.query;
    }

    /**
     * Get queries from local storage
     */
    getQueries(): SDPQuery[]{
        let queriesAsObject = JSON.parse(this._storage.getItem('queries'));

        let lQueries: SDPQuery[] = [];

        //Remove any null query
        if(queriesAsObject == null || queriesAsObject == undefined){
            return [];
        }else{
            for(let query of queriesAsObject){
                if(query != null && query != undefined){
                    lQueries.push(query);
                }
            }

            return lQueries == null? [] : lQueries;
        }
    }

    /**
     * Get current query index from local storage
     */
    getCurrentQueryIndex(): number{
        let queryAsObject: CurrentQueryInfo = this.getCurrentQueryInfo();
        return queryAsObject.queryIndex;
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
                    queryString = queryString.replace(new RegExp('"' + quotes[i].match(/\"(.*?)\"/)[1] + '"', 'g'), 'Quooooote'+("000" + i).slice(-3));
            }
        }

        // Translate the query string into a standard query string object
        let queryStringObject = this.parseQueryString(queryString);

        //Restore everything in quotes to free text string. Handle key-value pair later
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i] != '""'){
                    queryStringObject.freeTextString = queryStringObject.freeTextString.replace(new RegExp('Quooooote'+("000" + i).slice(-3), 'g'), quotes[i].match(/\"(.*?)\"/)[0]);
                }
            }
        }

        let lFreeTextSearch: string = queryStringObject.freeTextString;
        let lKeyValuePair: string = queryStringObject.keyValuePairString; 
        let query: SDPQuery = new SDPQuery(this.nextQueryId(), lQueryName);
        query.freeText = lFreeTextSearch.trim();
        if(!this.isEmpty(lKeyValuePair)){

            lKeyValuePair = lKeyValuePair.replace(new RegExp(' AND ', 'g'), '&AND&');
            lKeyValuePair = lKeyValuePair.replace(new RegExp('AND ', 'g'), 'AND&');
            lKeyValuePair = lKeyValuePair.replace(new RegExp(' OR ', 'g'), '&OR&');
            lKeyValuePair = lKeyValuePair.replace(new RegExp('OR ', 'g'), 'OR&');

            //Trim extra spaces
            lKeyValuePair = lKeyValuePair.replace(/\s+/g, ' ').trim();

            let keyValue: string[];
            let row: QueryRow;
            let items = lKeyValuePair.split('&');
            if(query.queryRows[0].fieldValue == ""){
                query.queryRows.shift();
            }

            if(items && items.length > 0 && items[0].trim()!=""){
                for (var i = 0; i < items.length; i++) {
                    keyValue = items[i].split("=");
                    row = new QueryRow(this.nextRowId(query));

                    // If first one is an operator, add it to the row and load next item
                    // Otherwise populate the row
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
                        let fieldValue = keyValue[0];
                        row.fieldValue = fieldValue;
                        let fieldType = this.getFieldType(fieldValue, fields);
                        row.fieldType = fieldType
                        // For key-value pair, we keep it as it is.
                        row.fieldText = keyValue[1].trim();
                        //Restore everything in quotes
                        if(quotes){
                            for(let i = 0; i < quotes.length; i++){
                                if(quotes[i] != '""'){
                                    row.fieldText = row.fieldText.replace(new RegExp('Quooooote'+("000" + i).slice(-3), 'g'), '"'+quotes[i].match(/\"(.*?)\"/)[1]+'"');
                                }
                            }
                        }  

                        query.queryRows.push(JSON.parse(JSON.stringify(row)));
                    }
                }
            }
        }
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

        if(query != null){
            currentQueries.push(JSON.parse(JSON.stringify(query)));
            this.saveQueries(currentQueries);
        }

        this.saveCurrentQueryInfo(new CurrentQueryInfo(query, -1, false));
    }

    /**
     * Query name field validation
     * 1. This field is required
     * 2. Query name should be unique
     * @param queryName 
     * @param prevQueryName previous query if any - for undo purpose 
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
        let nextId = 1;
        for(let row of query.queryRows)   {
            if(row.id >= nextId) nextId = row.id + 1;
        }     
        // let id = Math.max.apply(Math, query.queryRows.map(function(o) { return o.id; })) + 1;
        // if(id == null) return 1;
        // else return id;
        return nextId;
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
            for(let field of fields){
                if(field.value == fieldValue)
                    return field.label;
            }
            return "";
        }

    }

    parseQueryString(queryString: string): queryStrings {
        // All phrases in quotes should have been converted to special strings in the input queryString 
        // so we can treat all items as words or operators. Phrases will be restored later.

        let returnObject: queryStrings = new queryStrings();
        let lQueryString: string = "";
        let errorCount: number = 0;

        //Trim spaces
        queryString = queryString.replace(/\s+/g, ' ');

        if(!queryString){
            return returnObject;
        }

        // We need to put all free text search phrases together
        let lqStrArray:string[] = queryString.trim().split(" ");
        for(let i = 0; i < lqStrArray.length; i++){
            //If an item starts with "=" and the phrase before this phrase is not an operator or 
            //key value pair, mark the item as illegal and ignore it in the search string.
            if(i == 0 && lqStrArray[i].substr(0,1) == "="){
                lQueryString += ' <mark> ' + lqStrArray[i].trim() + ' </mark> ';
                errorCount++;
            }else if(lqStrArray[i].substr(lqStrArray[i].length - 1) == "="){
                //If an item ends with "=" and this is not the last phrase, check next item.
                //If next word is not "=" or an operator, use next item as the value of the "=" sign.
                //If this is the last item in the search string, mark it as illegal item and 
                //ignore it in the search string.
                if(i < lqStrArray.length - 1){
                    if(lqStrArray[i+1].indexOf("=") < 0 && this.operators.indexOf(lqStrArray[i+1].trim()) < 0){
                        returnObject.keyValuePairString += lqStrArray[i].trim() + lqStrArray[i+1].trim();
                        lQueryString += lqStrArray[i] + lqStrArray[i+1];
                        i++;
                    }else{
                        lQueryString += ' <mark> ' + lqStrArray[i].trim() + ' </mark> ';
                        errorCount++;
                    }
                }else{ // Otherwise, ignore
                    lQueryString += ' <mark> ' + lqStrArray[i].trim() + ' </mark> ';
                    errorCount++;
                }
            // If this is not the last item and not a key/value pair or an operator 
            // and next item starts with "=", combine this and next item a key/value pair.
            // e.g., keyword =physics will be converted to keyword=physics.
            // Else if this is an operator, mark this operator illegal and ignore. 
            // e.g., OR =physics will be converted to =physics.
            //Anything else if next item starts with "=", mark next item illegal and ignore.

            }else if(i < lqStrArray.length - 1 && lqStrArray[i+1].substr(0,1) == "="){
                if(lqStrArray[i].indexOf("=") < 0 && this.operators.indexOf(lqStrArray[i].trim()) < 0){
                    returnObject.keyValuePairString += lqStrArray[i].trim()+lqStrArray[i+1].trim();
                    i++;
                }else{
                    if(this.operators.indexOf(lqStrArray[i].trim()) >= 0){
                        lQueryString += ' <mark> ' + lqStrArray[i].trim() + " " + lqStrArray[i+1].trim() + ' </mark> ';
                        errorCount++;
                        i++
                    }else{
                        lQueryString += lqStrArray[i].trim() + ' <mark> ' + lqStrArray[i+1].trim() + ' </mark> ';
                        errorCount++;
                        i++
                    }
                }
            // If an operator appears at the very begining of the search string, mark it illegal and ignore.
            }else if(i == 0 && this.operators.indexOf(lqStrArray[i].trim()) >= 0){
                lQueryString += ' <mark> ' + lqStrArray[i].trim() + ' </mark> ';
                errorCount++;
            }else if(this.operators.indexOf(lqStrArray[i].trim()) >= 0){
                // If the item right before the freetext is an operator, or if an operator OR is between 
                // freetext and key-value pair, or the last item is an operator, mark it as illegal and ignore it
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
                    returnObject.keyValuePairString += lqStrArray[i] + " ";
                }
            }else{   
                // If this is not an operator and not a key/value pair, add it to free text string.
                // If this is a key-value pair and no operator right before this item, add AND operator.
                // For all other cases add this item to key-value pair string for further processing.

                if(lqStrArray[i].indexOf("=") < 0){
                    returnObject.freeTextString += lqStrArray[i].trim() + " ";
                }else{
                    if(i>0 && lqStrArray[i].indexOf("=")>-1 && this.operators.indexOf(lqStrArray[i-1].trim()) < 0){                        
                        returnObject.keyValuePairString += "AND " + lqStrArray[i].trim() + " ";
                    }else{
                        returnObject.keyValuePairString += lqStrArray[i].trim() + " ";
                    }
                }

                lQueryString += lqStrArray[i] + " ";
            }
        }
        
        if(errorCount == 1)
            returnObject.parseErrorMessage = 'Operator/phrase has been ignored: <i>'+lQueryString+'</i>. Click on Show Examples for more details.';

        if(errorCount > 1)
            returnObject.parseErrorMessage = 'Operators/phrases have been ignored: <i>'+lQueryString+'</i>. Click on Show Examples for more details.';

        return returnObject;
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
                queryString = queryString.replace(new RegExp(quotes[i].match(/\"(.*?)\"/)[1], 'g'), 'Quooooote'+("000" + i).slice(-3));
            }
        }

        let queryStringObject = this.parseQueryString(queryString);

        //Restore everything in quotes
        if(quotes){
            for(let i = 0; i < quotes.length; i++){
                if(quotes[i] != '""'){
                    queryStringObject.freeTextString = queryStringObject.freeTextString.replace(new RegExp('Quooooote'+("000" + i).slice(-3), 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
                    queryStringObject.keyValuePairString = queryStringObject.keyValuePairString.replace(new RegExp('Quooooote'+("000" + i).slice(-3), 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
                    queryStringObject.parseErrorMessage = queryStringObject.parseErrorMessage.replace(new RegExp('Quooooote'+("000" + i).slice(-3), 'g'), quotes[i].match(/\"(.*?)\"/)[1]);
                }
            }
        }      

        return queryStringObject.parseErrorMessage;
    }

    /**
     * Return unique query name that's not been used yet. Will return query001 or querry002... query099.
     * If all 99 query names are taken (which is unlikely), it will just return "Unknown". 
     */
    getUniqueQueryName(){
        let uniqueQueryNamefound: boolean = false;
        let counter: number = 1;
        let baseQueryName: string = "query";
        let returnQueryName: string;
        let queries = this.getQueries();

        while(!uniqueQueryNamefound && counter < 100){
            returnQueryName = baseQueryName + ("00" + counter).slice(-2);
            let nameExist: boolean = false;

            for(let i = 0; i < queries.length; i++){
                if(queries[i].queryName == returnQueryName)
                {
                    nameExist = true;
                    break;
                }
            }

            uniqueQueryNamefound = !nameExist;

            counter++;
        }

        if(!uniqueQueryNamefound)
            return "Unknown";
        else    
            return returnQueryName;
    }

    /**
     * Merge two query list and return merged list. If both lists contain same query, the most recent one wins.
     * @param queries01 query list #1 to be merged.
     * @param queries02 query list #2 to be merged.
     */
    mergeQueries(queries01: SDPQuery[], queries02: SDPQuery[]){
        let returnqueries: SDPQuery[] = [];

        for(let q1 of queries01){
            let found: boolean = false;
            queries02.forEach( (query, index) => {
                if(q1.queryName == query.queryName){
                    if(q1.modifiedDate < query.modifiedDate){
                        returnqueries.push(query);
                    }else{
                        returnqueries.push(q1);
                    }
                    queries02.splice(index, 1);
                    found = true;
                }
            });

            if(!found){
                returnqueries.push(q1);
            }
        }

        for(let q of queries02){
            returnqueries.push(q);
        }

        return returnqueries;
    }
}
