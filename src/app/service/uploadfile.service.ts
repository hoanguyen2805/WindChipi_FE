import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Orders } from '../models/order';
@Injectable()
export class UploadFileService{
    constructor(private http: HttpClient, private router: Router){}
    upload(file: File):Observable<HttpEvent<any>>{
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest("POST", "http://localhost:8080/api/files/upload", formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
    getFiles():Observable<any>{
        return this.http.get('http://localhost:8080/api/files/files');
    }
}