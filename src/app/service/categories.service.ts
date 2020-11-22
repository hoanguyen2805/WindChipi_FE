import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Categories } from '../models/categories';
@Injectable()
export class CategoriesService{
    constructor(private http: HttpClient, private router: Router){}
    getCategories(): Observable<Categories[]>{
        return this.http.get<Categories[]>('http://localhost:8080/api/categories/list').pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(err => of([]))
        )
    }
}