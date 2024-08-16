export class SDPQuery {
    constructor(
        public id: number = 0,
        public queryName: string = 'Unknown',
        public freeText = '',   // Free text search value
        public queryRows: QueryRow[] = [new QueryRow()],
        public modifiedDate: Date = new Date()
    ){}
}

export class QueryRow {
    constructor(
        public id: number = 0,
        public operator = 'AND',
        public fieldText = '',  // user input value for search
        public fieldType = '',  // Field label - description
        public fieldValue = '',  // Field value
        public validated = true  // For UI validation purpose
    ){
    }
}
  
export class CurrentQueryInfo {
    constructor(
        public query: SDPQuery = new SDPQuery(),
        public queryIndex: number = -1,
        public dataChanged: boolean = false
    ){
    }
}