import { TreeNodeDragEvent } from './treenodedragevent';
import * as i0 from "@angular/core";
export declare class TreeDragDropService {
    private dragStartSource;
    private dragStopSource;
    dragStart$: import("rxjs").Observable<TreeNodeDragEvent>;
    dragStop$: import("rxjs").Observable<TreeNodeDragEvent>;
    startDrag(event: TreeNodeDragEvent): void;
    stopDrag(event: TreeNodeDragEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeDragDropService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TreeDragDropService>;
}
