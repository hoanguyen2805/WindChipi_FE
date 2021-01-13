import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Comments } from '../models/comment';
@Injectable()
export class CommentService {
    constructor(private http: HttpClient, private router: Router) { }
    getCommentByProductId(product_id: String): Observable<Comments[]> {
        return this.http.get<Comments[]>(`http://localhost:8080/api/comments/listbyproductid/${product_id}`).pipe(
            catchError(error => of([]))
        );
    }
    saveComment(comment: Comments): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/comments/save', comment).pipe(
            tap(res => console.log("Thanh cong")),
            catchError(err => of(null))
        )
    }
    paging(page: number): Observable<Comments[]> {
        return this.http.get<Comments[]>(`http://localhost:8080/api/comments/page/${page}`).pipe(
            catchError(error => of([]))
        )
    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(`http://localhost:8080/api/comments/${id}`).pipe(
            tap(res => console.log("Xoa comment thanh cong")),
            catchError(err => of(null))
        )
    }

    searchComment(content: string, page: number):Observable<Comments[]>{
        return this.http.get<Comments[]>(`http://localhost:8080/api/comments/search?content=${content}&page=${page}`).pipe(
            // tap(res => console.log(res)),
            catchError(err => of(null))
        )
    }
    getSize(content: string): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/api/comments/getsize?content=${content}`).pipe(
            catchError(error => of(null))
        )
    }
}