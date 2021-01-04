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
        return this.http.get<Categories[]>('http://localhost:8080/api/categories/list')
    }

    getProductsByCategory(id: number):Observable<Categories>{
        return this.http.get<Categories>(`http://localhost:8080/api/categories/${id}`).pipe(
            // tap(res => console.log(JSON.stringify(res))),
            catchError(err => of(null))
        )
    }
    paging(page: number): Observable<Categories[]>{
        return this.http.get<Categories[]>(`http://localhost:8080/api/categories/page/${page}`).pipe(
            // tap(res => console.log(JSON.stringify(res))),
            catchError(err => of([]))
        )
    }

    add(category: Categories): Observable<any>{
        return this.http.post<any>('http://localhost:8080/api/categories/add', category).pipe(
            catchError(err => of(null))
        )
    }
    update(category: Categories):Observable<any>{
        return this.http.put<any>('http://localhost:8080/api/categories/update', category).pipe(
            catchError(err => of(null))
        )
    }
    delete(id: number):Observable<any>{
        return this.http.delete<any>(`http://localhost:8080/api/categories/${id}`).pipe(
            catchError(err => of(null))
        )
    }
}