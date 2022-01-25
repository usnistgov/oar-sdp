import { TreeNodeDragEvent } from './treenodedragevent';
import * as ɵngcc0 from '@angular/core';
export declare class TreeDragDropService {
    private dragStartSource;
    private dragStopSource;
    dragStart$: import("rxjs").Observable<TreeNodeDragEvent>;
    dragStop$: import("rxjs").Observable<TreeNodeDragEvent>;
    startDrag(event: TreeNodeDragEvent): void;
    stopDrag(event: TreeNodeDragEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TreeDragDropService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<TreeDragDropService>;
}

//# sourceMappingURL=treedragdropservice.d.ts.map