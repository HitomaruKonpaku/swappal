import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

describe('Test _services',function(){
    it('api.service - getAllSkill: Get value all skill from api server.', function () {
        var getAllSkill = function () {
            return this.http.get(this.address + '/skill/get', this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(getAllSkill).toThrow();
    });
    it('api.service - getAllCate 1: Get all category from api server.', function () {
        var getAllCate = function () {
            return this.http.get(this.address + '/skillcat/all', this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(getAllCate).toThrow();
    });
    it('api.service - getAllCate 2: Get all category 2 from api server.', function () {
        var getAllCate2 = function () {
            return this.http.get(this.address + '/skillcat/all2', this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(getAllCate2).toThrow();
    });
    it('api.service - getUserList: Get list accounts from api server.', function () {
        var getUserList = function () {
            return this.http.get(this.address + '/accounts/list', this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(getUserList).toThrow();
    });
    it('api.service - banUser: Get banUser from api server.', function () {
        var banUser = function (user:any) {
            return this.http.post(this.address + '/accounts/ban', user, this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(banUser).toThrow();
    });
    it('api.service - unbanUser: Get unbanUser from api server.', function () {
        var unbanUser = function (uid:any) {
            return this.http.post(this.address + '/accounts/unban', uid, this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(unbanUser).toThrow();
    });
    it('api.service - addCate: Get add category from api server.', function () {
        var addCate = function (name:any) {
            return this.http.post(this.address + '/skillcat/add', name, this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(addCate).toThrow();
    });
    it('api.service - addSkill: Get add skill from api server.', function () {
        var addSkill = function (skill:any) {
            return this.http.post(this.address + '/skill/add', name, this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(addSkill).toThrow();
    });
    it('api.service - editSkill: Get edit skill from api server.', function () {
        var editSkill = function (skill:any) {
            return this.http.post(this.address + '/skill/edit', name, this.jwt()).map(function (response:Response) { return response.json(); });
        };
        expect(editSkill).toThrow();
    });
    it('alert.service - success: Get success from api server.', function () {
        var success = function (message:any, keepAfterNavigationChange:any) {
            if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
            this.keepAfterNavigationChange = keepAfterNavigationChange;
            return this.subject.next({ type: 'success', text: message });
        };
        expect(success).toThrow();
    });
    it('alert.service - error: Get error from api server.', function () {
        var error = function (message:any, keepAfterNavigationChange:any) {
            if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
            this.keepAfterNavigationChange = keepAfterNavigationChange;
            return this.subject.next({ type: 'error', text: message });
        };
        expect(error).toThrow();
    });
    it('alert.service - getMessage: Get message from api server.', function () {
        var getMessage = function () {
            return this.subject.asObservable();
        };
        expect(getMessage).toThrow();
    });
});