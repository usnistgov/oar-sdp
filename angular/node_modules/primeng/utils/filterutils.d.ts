export declare class FilterUtils {
    static filter(value: any[], fields: any[], filterValue: string, filterMatchMode: string, filterLocale?: string): any[];
    static startsWith(value: any, filter: any, filterLocale?: any): boolean;
    static contains(value: any, filter: any, filterLocale?: any): boolean;
    static endsWith(value: any, filter: any, filterLocale?: any): boolean;
    static equals(value: any, filter: any, filterLocale?: any): boolean;
    static notEquals(value: any, filter: any, filterLocale?: any): boolean;
    static in(value: any, filter: any[], filterLocale?: any): boolean;
    static lt(value: any, filter: any, filterLocale?: any): boolean;
    static lte(value: any, filter: any, filterLocale?: any): boolean;
    static gt(value: any, filter: any, filterLocale?: any): boolean;
    static gte(value: any, filter: any, filterLocale?: any): boolean;
}
