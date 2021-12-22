import { SelectItem } from '../common/selectitem';
export declare class ObjectUtils {
    equals(obj1: any, obj2: any, field?: string): boolean;
    equalsByValue(obj1: any, obj2: any, visited?: any[]): boolean;
    resolveFieldData(data: any, field: any): any;
    private isFunction;
    filter(value: any[], fields: any[], filterValue: string): any[];
    reorderArray(value: any[], from: number, to: number): void;
    generateSelectItems(val: any[], field: string): SelectItem[];
    insertIntoOrderedArray(item: any, index: number, arr: any[], sourceArr: any[]): void;
    findIndexInList(item: any, list: any): number;
}
