import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Products } from '../models/product';
@Injectable()
export class ProductService{
    constructor(private http: HttpClient, private router: Router){}
    searchProductsWithKeyword(category: Number, keyword: String):Observable<Products[]>{
        return this.http.get<Products[]>(`http://localhost:8080/api/products/search/${category}/${keyword}`).pipe(
            // tap(res => console.log(`${JSON.stringify(res)}`)),
            catchError(error => of([]))
        );
    }
    searchProductWithNoKeyword(category: Number):Observable<Products[]>{
        return this.http.get<Products[]>(`http://localhost:8080/api/products/search/${category}`).pipe(
            // tap(res => console.log(`${JSON.stringify(res)}`)),
            catchError(error => of([]))
        )
    }
    getProductById(id: number):Observable<Products>{
        return this.http.get<Products>(`http://localhost:8080/api/products/${id}`).pipe(
            // tap(res => console.log("San pham: "+JSON.stringify(res))),
            catchError(error => of(null))
        )
    }
    getNewProducts():Observable<Products[]>{
        return this.http.get<Products[]>('http://localhost:8080/api/products/newproducts').pipe(
            // tap(res => console.log(`Sản phẩm mới: ${JSON.stringify(res)}`)),
            catchError(error => of([]))
        )
    }
    getHotProducts():Observable<Products[]>{
        return this.http.get<Products[]>('http://localhost:8080/api/products/hotproducts').pipe(
            // tap(res => console.log(`Sản phẩm hot: ${JSON.stringify(res)}`)),
            catchError(error => of([]))
        )
    }
    getRelatedProducts(category: String, product: String):Observable<Products[]>{
        return this.http.get<Products[]>(`http://localhost:8080/api/products/relatedproduct/${category}/${product}`).pipe(
            // tap(res => console.log(`Sản phẩm hot: ${JSON.stringify(res)}`)),
            catchError(error => of([]))
        )
    }
    getProductInCart(arr: String[]):Observable<Products[]>{
        return this.http.post<Products[]>('http://localhost:8080/api/products/productscart', arr).pipe(
           tap(res => console.log(JSON.stringify(res))),
           catchError(error => of([]))
        )
    }

    getTotalProduct(id: String):Observable<Number>{
        return this.http.get<Number>(`http://localhost:8080/api/products/gettotal/${id}`).pipe(
            tap(res => console.log(JSON.stringify(res))),
            catchError(error => of(null))
        )
    }
    getSize():Observable<any>{
        return this.http.get<any>('http://localhost:8080/api/products/size').pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    paging(page: number):Observable<Products[]>{
        return this.http.get<Products[]>(`http://localhost:8080/api/products/page/${page}`).pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of([]))
        )
    }

    getSizeOrderByProduct(id: number):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/products/sizeorder/${id}`).pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    getSizeCommentByProduct(id: number):Observable<any>{
        return this.http.get<any>(`http://localhost:8080/api/products/sizecomment/${id}`).pipe(
            // tap(res=>console.log(`size: ${JSON.stringify(res)}`)),
            catchError(err=>of(null))
        )
    }
    deleteProductByAdmin(id: number):Observable<any>{
        return this.http.delete<any>(`http://localhost:8080/api/products/${id}`).pipe(
            // tap(res => console.log(res)),
            catchError(err => of(null))
        )
    }
}