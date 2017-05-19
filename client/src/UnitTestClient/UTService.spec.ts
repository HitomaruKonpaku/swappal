import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../app/_models/index';

describe("Test _service", function() {
    beforeEach(() => [ 
       
    ]);
  it("api.service - getProfile", function(){
      var getProfile = function(email: any){
          return this.http.get(this.address + '/accounts/profile' + '?email=' + email, this.jwt()).map((response: Response) => response.json())
      };
      expect(getProfile).toThrow();
  });
  it("api.service - getSkills", function(){
      var getSkills = function(email: any){
          return this.http.get(this.address + '/accounts/skills' + '?email=' + email, this.jwt()).map((response: Response) => response.json())
      };
      expect(getSkills).toThrow();
  });
  it("api.service - getAllSkills", function() {
    var getAllSkills = function() {
        return this.http.get(this.address + '/skills' + '?=limit100', this.jwt()).map((response: Response) => response.json())
    };
    expect(getAllSkills).toThrow();
  });
  it("api.service - searchSkill", function(){
      var searchSkill = function(search : any){
          return this.http.post(this.address+'/search', search, this.jwt()).map((response: Response) => response.json());
      };
      expect(searchSkill).toThrow();
  });
  it("api.service - create", function(){
      var create = function(user:any){
          return this.http.post(this.address + '/reg', user, this.jwt()).map((response: Response) => response.json());
      };
      expect(create).toThrow();
  });
  it("api.service - createProfile", function(){
      var createProfile = function(user:any){
          return this.http.post(this.address + '/accounts/profile', user, this.jwt()).map((response: Response) => response.json());
      };
      expect(createProfile).toThrow();
  });
  it("api.service - updateProfile", function(){
      var updateProfile = function(user:any){
          return this.http.post(this.address + '/accounts/profile', user, this.jwt()).map((response: Response) => response.json());
      };
      expect(updateProfile).toThrow();
  });
  it("api.service - newRequest", function(){
      var newRequest = function(request:any){
          return this.http.post(this.address + '/request/new',request,this.jwt()).map((response: Response) => response.json());
      };
      expect(newRequest).toThrow();
  });
  it("api.service - replyRequest", function(){
      var replyRequest = function(request:any){
          return this.http.post(this.address + '/request/reply',request,this.jwt()).map((response: Response) => response.json());
      };
      expect(replyRequest).toThrow();
  });
  it("api.service - acceptRequest",function(){
      var acceptRequest = function(request:any){
          return this.http.post(this.address + '/request/accept',request,this.jwt()).map((response: Response) => response.json());
      };
      expect(acceptRequest).toThrow();
  });
  it("api.service - declineRequest", function(){
      var declineRequest = function(request:any){
          return this.http.post(this.address + '/request/decline',request,this.jwt()).map((response: Response) => response.json());
      };
      expect(declineRequest).toThrow();
  });
  it("api.service - completeRequest",function(){
      var completeRequest = function(request:any){
          return this.http.post(this.address + '/request/complete', request,this.jwt()).map((response: Response) => response.json());
      };
      expect(completeRequest).toThrow();
  });
  it("alert.service - success", function() {
        var success = function(message: string, keepAfterNavigationChange = false){
            this.keepAfterNavigationChange = keepAfterNavigationChange;
            return this.subject.next({ type: 'success', text: message });
    };
    expect(success).toThrow();
  });
  it("alert.service - getMessage", function() {
      var getMessage = function(){
          return this.subject.asObservable();
    };
    expect(getMessage).toThrow();
  });
  it("alert.service - error", function() {
      var error = function(message: string, keepAfterNavigationChange = false){
          this.keepAfterNavigationChange = keepAfterNavigationChange;
          return this.subject.next({ type: 'error', text: message });
    };
    expect(error).toThrow();
  });
  it("authentication.service - login",function(){
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
    it("authentication.service - logout",function(){
        var logout = function(){
            return  localStorage.removeItem(this.localKey);
        };
        expect(logout).toThrow();
    });
    it("authentication.service - status",function(){
        var status = function(){
            return localStorage.getItem(this.localKey) ? true : false;
        }
        expect(status).toThrow();
    });

//   it("Service - User Service - jwt", function(){
//       var jwt = function(){
//           let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//           var headers = new Headers();
//           headers.append('Content-Type', 'application/json');
//           if (currentUser && currentUser.token) {
//               headers.append('Authorization', 'Bearer' + currentUser.token);
//               headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
//             } else {
//                 return new RequestOptions({ headers: headers });
//             }
//       };
//       expect(jwt).toThrow();
//   });
});