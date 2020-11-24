import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contacts } from '../models/contact';
@Injectable()
export class ContactService{
    constructor(private http: HttpClient, private router: Router){}
    createContact(contact: Contacts):Observable<any>{
        return this.http.post<any>('http://localhost:8080/api/contacts/contact',contact);
    }
}