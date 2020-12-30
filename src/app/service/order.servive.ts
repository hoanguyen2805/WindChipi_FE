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
            tap(res => console.log(res)),
            catchError(err => of([]))
        )
    }
    // getCategories(): Observable<Categories[]>{
    //     return this.http.get<Categories[]>('http://localhost:8080/api/categories/list')
    // }

    // getProductsByCategory(id: String):Observable<Categories>{
    //     return this.http.get<Categories>(`http://localhost:8080/api/categories/${id}`).pipe(
    //         tap(res => console.log(JSON.stringify(res))),
    //         catchError(err => of(null))
    //     )
    // }
}