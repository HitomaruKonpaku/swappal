import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private address: string = 'http://localhost:3001/apis/accounts/authenticate';
    private localKey: string = 'currentUser';

    constructor(private http: Http) { }

    // login(username: string, password: string) {
    login(data: any) {
        // return this.http.post(this.address, data, this.addHeader()) // ...using post request
        //     .map((res: Response) => {
        //         console.log(res.json());
        //     }) // ...and calling .json() on the response to return data
        //     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 

        return this.http.post(this.address, data, this.authHeader())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let res = response.json();
                console.log(res);
                if (res && res.msg === 'success' && res.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.localKey, JSON.stringify(res.data));
                }
                return response.json();
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.localKey);
    }

    // return login status
    status(): boolean {
        return localStorage.getItem(this.localKey) ? true : false;
    }

    private authHeader() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }
}