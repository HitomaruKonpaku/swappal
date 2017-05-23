import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class APIService {
    private address: string = 'http://localhost:3001/apis';

    constructor(private http: Http) { }

    getAllSkill(){
      return this.http.get(this.address+ '/skill/get', this.jwt()).map((response: Response) => response.json());
    }
    getAllCate(){
      return this.http.get(this.address+ '/skillcat/all', this.jwt()).map((response: Response) => response.json());
    }

    getUserList(){
      return this.http.get(this.address+ '/accounts/list', this.jwt()).map((response: Response) => response.json());
    }
    banUser(user: any){
      return this.http.post(this.address+'/accounts/ban', user, this.jwt()).map((response: Response) => response.json());
    }
    unbanUser(uid :any){
      return this.http.post(this.address+'/accounts/unban', uid, this.jwt()).map((response: Response) => response.json());
    }
    addCate(name: any){
      return this.http.post(this.address+'/skillcat/add', name, this.jwt()).map((response: Response) => response.json());
    }
    addSkill(skill: any){
      return this.http.post(this.address+'/skill/add', name, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (currentUser && currentUser.token) {
            // headers.append('Authorization', 'Bearer' + currentUser.token);
            // headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        } else { }
        return new RequestOptions({ headers: headers });
    }
}
