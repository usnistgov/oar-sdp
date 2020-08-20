export class Query {
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
        public fieldText = '',
        public fieldType = '',  // Field label
        public fieldValue = ''  // Field value
    ){
    }
}
  