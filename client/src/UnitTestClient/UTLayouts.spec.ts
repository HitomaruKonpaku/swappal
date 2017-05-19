import { Component, OnInit } from '@angular/core';
import { AuthenticationService, APIService } from '../app/_services/index';

describe("Test Layouts",function(){
    it("Header - ngOnInit", function(){
        var ngOnInit = function(){
            this.updateLoginStatus();
            this.currentEmail = localStorage.getItem('currentEmail');
            return this.profileService.getProfile(this.currentEmail);
        };
        expect(ngOnInit).toThrow();
    });
    it("Header - updateLoginStatus", function(){
        var updateLoginStatus = function(){
            return this.isLogin = this.authService.status();
        };
        expect(updateLoginStatus).toThrow();
    });
});