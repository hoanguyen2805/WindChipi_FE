import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ComponentShareService {
    private message = new BehaviorSubject('');
    sharedMessage = this.message.asObservable();
    constructor() { }
    nextMessage(message: any) {
        // console.log(message)
        this.message.next(message)
    }
}