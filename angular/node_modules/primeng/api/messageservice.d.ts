import { Message } from './message';
import * as i0 from "@angular/core";
export declare class MessageService {
    private messageSource;
    private clearSource;
    messageObserver: import("rxjs").Observable<Message | Message[]>;
    clearObserver: import("rxjs").Observable<string>;
    add(message: Message): void;
    addAll(messages: Message[]): void;
    clear(key?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageService>;
}
