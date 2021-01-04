import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Orders } from '../models/order';
@Injectable()
export class OrderService{
    constructor(private http: HttpClient, private router: Router){}
    save(id: number, number_products: number):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/orders/save/${id}/${number_products}`);
    }

    getByUser():Observable<Orders[]>{
        return this.http.get<Orders[]>('http://localhost:8080/api/orders/getbyuser').pipe(
            // tap(res => console.log(res)),
            catchError(err => of([]))
        )
    }
   
    getSize():Observable<Orders[]>{
        return this.http.get<Orders[]>('http://localhost:8080/api/orders/size').pipe(
            catchError(err => of([]))
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
}