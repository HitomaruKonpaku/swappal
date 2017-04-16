import { Component, OnInit } from '@angular/core';
import { APIService } from '../app/_services/index';
// import { RequestDialogComponent} from '../app/profile/request.component';
import {MdDialog} from '@angular/material';

describe("Test profile",function(){
    it("profile.component - ngOnInit (successful)",function(){
        var ngOnInit = function(data:any){
            this.profile = data.data.profile;
            return console.log(this.profile);
        };
        expect(ngOnInit).toThrow();
    });
    it("profile.component - ngOnInit (fail)",function(){
        var ngOnInit = function(data:any){
            this.profile = data.data.profile
            return console.log("error");
        };
        expect(ngOnInit).toThrow();
    });
    // it("profile.component - openDialog",function(){
    //     var openDialog = function(){
    //         return this.dialog.open(RequestDialogComponent);
    //     };
    //     expect(openDialog).toThrow();
    // });
    it("profile.component - switchForm 1",function(){
        var switchForm = function(){
            return this.hideDisplay = false;
        };
        expect(switchForm).toThrow();
    });
    it("profile.component - switchForm 2",function(){
        var switchForm = function(){
            return this.hideDisplay = true;
        };
        expect(switchForm).toThrow();
    });
});
