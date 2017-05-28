import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { AlertService, APIService } from '../app/_services';

describe("Test Register",function(){
    it("Register.Component - onSubmit 1: Transmission notification registration successful from client to server.",function(){
        var onSubmit = function(){
            return this.alertService.success('Registration successful', true);
        };
        expect(onSubmit).toThrow();
    });
    it("Register.Component - onSubmit 2: Redirect input of register like login.",function(){
        var onSubmit = function(){
            return this.router.navigate(['/login']);
        };
        expect(onSubmit).toThrow();
    });
    it("Register.Component - onSubmit 3: Transmission of false data from client to server.",function(){
        var onSubmit = function(data:any){
            return this.alertService.error(data.msg);
        };
        expect(onSubmit).toThrow();
    });
    it("Register.Component - onSubmit 4: Transmission error from client to server.",function(){
        var onSubmit = function(error:any){
            return this.alertService.error(error);
        };
        expect(onSubmit).toThrow();
    });
    it("Register.Component - goBack: Back to the previous location.",function(){
        var goBack = function(){
            return this.location.back();
        };
        expect(goBack).toThrow();
    });
});
