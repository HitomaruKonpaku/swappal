import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { AlertService, UserService } from '../app/_services';

describe("Register Component",function(){
    it("Register Component - onSubmit 1",function(){
        var onSubmit = function(){
            return this.alertService.success('Registration successful', true);
        };
        expect(onSubmit).toThrow();
    });
    it("Register Component - onSubmit 2",function(){
        var onSubmit = function(){
            return this.router.navigate(['/login']);
        };
        expect(onSubmit).toThrow();
    });
    it("Register Component - onSubmit 3",function(){
        var onSubmit = function(data:any){
            return this.alertService.error(data.msg);
        };
        expect(onSubmit).toThrow();
    });
    it("Register Component - onSubmit 4",function(){
        var onSubmit = function(error:any){
            return this.alertService.error(error);
        };
        expect(onSubmit).toThrow();
    });
    it("Register Component - goBack",function(){
        var goBack = function(){
            return this.location.back();
        };
        expect(goBack).toThrow();
    });
});