import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class APIService {
    private address: string = 'http://localhost:3001/apis';

    constructor(private http: Http) { }

    getProfile(email: any) {
      return this.http.get(this.address + '/accounts/profile' + '?email=' + email, this.jwt()).map((response: Response) => response.json())

    }
    getSkills(email: any){
      return this.http.get(this.address + '/accounts/skills' + '?email=' + email, this.jwt()).map((response: Response) => response.json())

    }
    getAllSkills(){
        return this.http.get(this.address + '/skills' + '?=limit100', this.jwt()).map((response: Response) => response.json())
    }
    searchSkill(search : any){
      return this.http.post(this.address+'/search', search, this.jwt()).map((response: Response) => response.json());
    }

    create(user: any) {
        return this.http.post(this.address+ '/accounts/reg', user, this.jwt()).map((response: Response) => response.json());
    }
    createProfile(user: any){
      return this.http.post(this.address + '/accounts/profile', user, this.jwt()).map((response: Response) => response.json());
    }
    updateProfile(user : any){
      return this.http.post(this.address + '/accounts/profile', user, this.jwt()).map((response: Response) => response.json());
    }

    newRequest(request: any){
      return this.http.post(this.address + '/request/new',request,this.jwt()).map((response: Response) => response.json());
    }
    replyRequest(request: any){
      return this.http.post(this.address + '/request/reply',request,this.jwt()).map((response: Response) => response.json());
    }
    acceptRequest(request:any){
      return this.http.post(this.address + '/request/accept',request,this.jwt()).map((response: Response) => response.json());
    }
    declineRequest(request:any){
      return this.http.post(this.address + '/request/decline',request,this.jwt()).map((response: Response) => response.json());
    }
    completeRequest(request:any){
      return this.http.post(this.address + '/request/complete', request,this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

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
