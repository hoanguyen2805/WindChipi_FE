import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from '../models/user';
@Injectable()
export class UsersService{
    constructor(private http: HttpClient, private router: Router){}
    getUserByToken(): Observable<Users>{
        return this.http.get<any>('http://localhost:8080/api/users/user').pipe(
            // tap(res=>console.log(`Xem thông tin tài khoản: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    updateUser(user: Users):Observable<any>{
        return this.http.patch('http://localhost:8080/api/users/user', user).pipe(
            // tap(res=> console.log(res)),
            catchError(err=>of(new Users()))
        )
    }
    getSize():Observable<any>{
        return this.http.get<any>('http://localhost:8080/api/users/size').pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    paging(page: number):Observable<Users[]>{
        return this.http.get<Users[]>(`http://localhost:8080/api/users/paging/${page}`).pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of([]))
        )
    }

    getSizeOrderByUser(id: number):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/users/sizeorder/${id}`).pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    getSizeCommentByUser(id: number):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/users/sizecomment/${id}`).pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    deleteUserByAdmin(id: number):Observable<any>{
        return this.http.delete<any>(`http://localhost:8080/api/users/${id}`).pipe(
            // tap(res => console.log(res)),
            catchError(err => of(null))
        )
    }

    updateUserByAdmin(user: Users):Observable<any>{
        return this.http.patch('http://localhost:8080/api/users/updateuser', user).pipe(
            // tap(res=> console.log(res)),
            catchError(err=>of(new Users()))
        )
    }
}