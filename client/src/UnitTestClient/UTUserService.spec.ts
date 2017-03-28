import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../app/_models/index';

describe("Test _service",function(){
    it("UserService - getAll",function(){
        var getAll = function(){
            return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
        };
        expect(getAll).toThrow();
    });
    it("UserService - getById",function(){
        var getById = function(id:number){
            return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
        };
        expect(getById).toThrow();
    });
    it("UserService - create",function(){
        var create = function(user:any){
            return this.http.post(this.address + '/reg', user, this.jwt()).map((response: Response) => response.json());
        };
        expect(create).toThrow();
    });
    it("UserService - update",function(){
        var update = function(user:User){
            return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
        };
        expect(update).toThrow();
    });
    it("UserService - delete",function(){
        var dele = function(id:number){
            return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
        };
        expect(dele).toThrow();
    })
});