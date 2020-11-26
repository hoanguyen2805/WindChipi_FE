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
            tap(res=>console.log(`Xem thông tin tài khoản: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    updateUser(user: Users):Observable<any>{
        return this.http.patch('http://localhost:8080/api/users/user', user).pipe(
            tap(res=> console.log(res)),
            catchError(err=>of(new Users()))
        )
    }
}