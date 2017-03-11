import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    private address: string = 'http://localhost:3001/apis/accounts';

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: any) {
        // return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
        // console.log(user);

        // let bodyString = user;
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http.post(this.address, user, options).map((response: Response) => response.json());

        return this.http.post(this.address + '/reg', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (currentUser && currentUser.token) {
            headers.append('Authorization', 'Bearer' + currentUser.token);
            // headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        } else { }
        return new RequestOptions({ headers: headers });
    }
}