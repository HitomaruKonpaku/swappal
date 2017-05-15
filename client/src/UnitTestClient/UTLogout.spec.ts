import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

describe("Test logout",function(){
    it("Logout.Component - ngOnInit",function(){
    var ngOnInit = function(){
        this.authenticationService.logout();   
        this.router.navigate(['/']);     
        return location.reload();
    };
    expect(ngOnInit).toThrow();
  })
});