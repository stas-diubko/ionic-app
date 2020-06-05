import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl: string;
    userData = new Subject<any>();
    userData$ = this.userData.asObservable();

    constructor(
        private http: HttpClient,
        private authHelper: AuthHelper,
    ) {
        this.apiUrl = environment.apiUrl;
    }

    getUserData() {
        let decodedToken = this.authHelper.getToken();
        if(decodedToken) {
            return this.http.get<any>(this.apiUrl + `/users/${decodedToken.id}`).subscribe(data => {
                this.userData.next(data);
            })
        }
    }
}