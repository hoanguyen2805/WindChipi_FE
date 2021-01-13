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

    paging(page: number):Observable<Contacts[]>{
        return this.http.get<Contacts[]>(`http://localhost:8080/api/contacts/page/${page}`).pipe(
            // tap(res => console.log(`${JSON.stringify(res)}`)),
            catchError(error => of([]))
        );
    }
    delete(id: number):Observable<any>{
        return this.http.delete<any>(`http://localhost:8080/api/contacts/${id}`).pipe(
            tap(res => console.log(res)),
            catchError(error => of(null))
        )
    }
    getSize(content: string):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/contacts/getsize?content=${content}`).pipe(
            // tap(res => console.log(`${JSON.stringify(res)}`)),
            catchError(error => of(null))
        );
    }
    searchContact(content: string, page: number):Observable<Contacts[]>{
        return this.http.get<Contacts[]>(`http://localhost:8080/api/contacts/search?content=${content}&page=${page}`).pipe(
            // tap(res => console.log(res)),
            catchError(err => of(null))
        )
    }
}