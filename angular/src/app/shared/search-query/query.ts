export class SDPQuery {
    constructor(
        public id: number = 0,
        public queryName: string = '',
        public queryRows: QueryRow[] = [],
        public date: Date = null
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
  