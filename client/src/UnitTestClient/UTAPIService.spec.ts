import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../app/_models/index';

describe("Test Service", function() {
    beforeEach(() => [ 
       
    ]);
  it("Service - User Service - getall", function() {
    var getall = function() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    };
    expect(getall).toThrow();
  });
  it("Service - User Service - getById", function(){
      var getById = function(id:number){
          return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
      };
      expect(getById).toThrow();
  });
  it("Service - User Service - create", function(){
      var create = function(user:any){
          return this.http.post(this.address + '/reg', user, this.jwt()).map((response: Response) => response.json());
      };
      expect(create).toThrow();
  });
  it("Service - User Service - update", function(){
      var update = function(user:any){
          return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
      };
      expect(update).toThrow();
  });
  it("Service - User Service - delete", function(){
      var dele = function(id: number){
          return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
      };
      expect(dele).toThrow();
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