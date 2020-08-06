export class Query {
    constructor(
        public id: any = null,
        public queryName: string = '',
        public queryRows: QueryRow[] = [],
        public date: Date = null
    ){}
}

export class QueryRow {
    constructor(
        public operator = 'AND',
        public fieldText = '',
        public fieldType = ''
    ){
    }
}
  