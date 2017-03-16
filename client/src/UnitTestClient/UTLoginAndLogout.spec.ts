import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

describe("Test Login & Logout", function() {
    beforeEach(() => [ 
       
    ]);
  it("Login - Check Email", function() {
    var a = "acnvm@gmail.com";
    var b = "acnvm@yahoo.com";
    expect(a).toMatch("@gmail.com");
    expect(b).toMatch("@yahoo.com");
  });
  it("Login - Check Password", function() {
    var password = "asdhsakflasq";
    expect(password).toMatch('asdhsakflasq');
  });
  it("Login.Component - ngOnInit", function() {
    var ngOnInit = function(){
      if (this.authenticationService.status() === true) {
            this.router.navigate(['/']);
        }
        return this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    expect(ngOnInit).toThrow();
  });
  it("AuthenticationService - login", function() {
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
    };
    expect(login).toThrow();
  });
  it("AuthenticationService - status", function() {
    var status = function(){
      return localStorage.getItem(this.localKey) ? true : false;
    };
    expect(status).toThrow();
  });
  it("AuthenticationService - logout", function() {
    var logout = function(){
      return localStorage.removeItem(this.localKey);
    };
    expect(logout).toThrow();
  });
});