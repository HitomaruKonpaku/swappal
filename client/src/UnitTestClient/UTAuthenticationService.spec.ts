import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

describe("Test _Service",function(){
    it("Authentication.service - login",function(){
        var login = function(data:any){
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
        expect(login).toThrow();
    });
    it("Authentication.service - logout",function(){
        var logout = function(){
            return  localStorage.removeItem(this.localKey);
        };
        expect(logout).toThrow();
    });
    it("Authentication.service - status",function(){
        var status = function(){
            return localStorage.getItem(this.localKey) ? true : false;
        }
        expect(status).toThrow();
    });
});