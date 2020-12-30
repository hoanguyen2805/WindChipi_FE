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
            // tap(res => console.log(`${JSON.stringify(res)}`)),
            catchError(error => of([]))
        );
    }
    saveComment(comment: Comments): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/comments/save', comment).pipe(
            tap(res => console.log("Thanh cong")),
            catchError(err => of(null))
        )
    }
}