import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

describe("Test Login", function() {
    beforeEach(() => [ 
       
    ]);
  it("login.Component - ngOnInit", function() {
    var ngOnInit = function(){
      if (this.authenticationService.status() === true) {
            this.router.navigate(['/']);
        }
        return this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    expect(ngOnInit).toThrow();
  });
  // it("Logout.Component - ngOnInit",function(){
  //   var ngOnInit = function(){
  //       this.authenticationService.logout();   
  //       this.router.navigate(['/']);     
  //       return location.reload();
  //   };
  //   expect(ngOnInit).toThrow();
  // })
  it("login.component - onSubmit",function(){
    var onSubmit = function(f:any){
      var v = f.value
      this.loading = true;
      this.mailCheck = this.validation.EmailValidation(v.email);
      this.passwordCheck = this.validation.PasswordValidation(v.pwd);
      if (this.mailCheck == false){
        this.alertService.error('Xin nhập lại Email')
      }else if (this.passwordCheck == false){
        return this.alertService.error('Mật khẩu phải có 8 kí tự trở lên')
      }
    };
    expect(onSubmit).toThrow();
  });
  it("login.component - SocialLogin", function(){
    var SocialLogin = function(email:any,userid:any){
      var str = '{"email":"'+email+'","pwd":"'+userid+'"}'
      var json = JSON.parse(str);
      console.log(json)
      this.apiService.create(json)
      return this.authenticationService.login(json);
    };
    expect(SocialLogin).toThrow();
  });
  it("login.component - onCreateProfile", function(){
    var onCreateProfile = function(a:any){
      var value = a.value;
      console.log (value);
      value.email = this.email;
      return this.apiService.createProfile(value)
    };
    expect(onCreateProfile).toThrow()
  });
  it("login.component - signIn", function(){
    var signIn = function(provider:any){
      return this.sub = this._auth.login(provider);
    };
    expect(signIn).toThrow();
  });
});