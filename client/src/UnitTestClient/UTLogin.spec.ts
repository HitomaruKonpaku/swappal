import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

describe("Test Login", function() {
    beforeEach(() => [ 
       
    ]);
  it("Login - Check Email successful", function() {
    var a = "acnvm@gmail.com";
    var b = "acnvm@yahoo.com";
    expect(a).toMatch("@gmail.com");
    expect(b).toMatch("@yahoo.com");
  });
  
});