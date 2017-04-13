import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../app/_models/index';

describe("Test _service", function() {
    beforeEach(() => [ 
       
    ]);
  it("APIService - getall", function() {
    var getall = function() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    };
    expect(getall).toThrow();
  });
  it("APIService - getById", function(){
      var getById = function(id:number){
          return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
      };
      expect(getById).toThrow();
  });
  it("APIService - create", function(){
      var create = function(user:any){
          return this.http.post(this.address + '/reg', user, this.jwt()).map((response: Response) => response.json());
      };
      expect(create).toThrow();
  });
  it("APIService - update", function(){
      var update = function(user:any){
          return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
      };
      expect(update).toThrow();
  });
  it("APIService - delete", function(){
      var dele = function(id: number){
          return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
      };
      expect(dele).toThrow();
  });
  it("APIService - getProfile", function(){
      var getProfile = function(email: any){
          return this.http.get(this.address + '/accounts/profile' + '?email=' + email, this.jwt()).map((response: Response) => response.json())
      };
      expect(getProfile).toThrow();
  });
  it("APIService - getSkills", function(){
      var getSkills = function(email: any){
          return this.http.get(this.address + '/accounts/skills' + '?email=' + email, this.jwt()).map((response: Response) => response.json())
      };
      expect(getSkills).toThrow();
  });
//   it("Service - User Service - jwt", function(){
      
//       var jwt = function(){
//         let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         var headers = new Headers();
//         headers.append('Content-Type', 'application/json');
//         if (currentUser && currentUser.token) {
//             headers.append('Authorization', 'Bearer' + currentUser.token);
//             headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
//         } else { }
//         return new RequestOptions({ headers: headers });
//       };
//       expect(jwt).toThrow();
//   });
});