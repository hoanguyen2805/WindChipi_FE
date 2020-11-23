import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from '../models/user';
@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }
    login(user): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/auth/signin', user).pipe(
            tap(res=> {
                console.log(res);    
            })
        )
    }
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
    }
    register(user: Users):Observable<any>{
        return this.http.post<any>('http://localhost:8080/api/auth/signup',user);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    loggedIn(){
        return !!localStorage.getItem('token');
    }
    getRoles(){
        if(localStorage.getItem("roles") !== null){
            return localStorage.getItem("roles").split(",");
        }
        else{
            return [""];
        }
    }
}