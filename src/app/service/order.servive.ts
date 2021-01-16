import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Orders } from '../models/order';
@Injectable()
export class OrderService{
    constructor(private http: HttpClient, private router: Router){}
    save(newOrder: Orders):Observable<any>{
        return this.http.post<any>("http://localhost:8080/api/orders/save", newOrder).pipe(
            tap(res => console.log(`Thanh cong: ${res}`)),
            catchError(err => of(new Orders()))
        );
    }

    getOrdersByUser():Observable<Orders[]>{
        return this.http.get<Orders[]>('http://localhost:8080/api/orders/getordersbyuser').pipe(
            tap(res => console.log(res)),
            catchError(err => of([]))
        )
    }
   
    getSize(content: string):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/orders/getsize?content=${content}`).pipe(
            catchError(err => of(null))
        )
    }
    paging(page: number):Observable<Orders[]>{
        return this.http.get<Orders[]>(`http://localhost:8080/api/orders/page/${page}`).pipe(
            catchError(err => of([]))
        )
    }
    deleteById(id: number):Observable<any>{
        return this.http.delete<any>(`http://localhost:8080/api/orders/${id}`).pipe(
            catchError(err => of(null))
        )
    }
    updateBot(bot: number, order: Orders):Observable<any>{
        return this.http.put<any>(`http://localhost:8080/api/orders/${bot}`, order).pipe(
            catchError(err => of(null))
        )
    }

    searchOrder(content: string, page: number):Observable<Orders[]>{
        return this.http.get<Orders[]>(`http://localhost:8080/api/orders/search?content=${content}&page=${page}`).pipe(
            // tap(res => console.log(res)),
            catchError(err => of(null))
        )
    }
}