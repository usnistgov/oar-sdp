import { Observable } from 'rxjs';
import { Message } from './message';
export declare class MessageService {
    private messageSource;
    private clearSource;
    messageObserver: Observable<Message | Message[]>;
    clearObserver: Observable<string>;
    add(message: Message): void;
    addAll(messages: Message[]): void;
    clear(key?: string): void;
}
